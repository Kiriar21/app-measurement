const Event = require('../db/Models/Event');
const Participant = require('../db/Models/Participant');
const { Readable } = require('stream');
const multer = require('multer');

const csv = require('csv-parser');
const fs = require('fs');
const iconv = require('iconv-lite');


const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('Nieprawidłowy format pliku. Przesyłaj pliki CSV.'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Maksymalny rozmiar pliku 5MB
});


const createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        const result = await event.save();
        res.status(201).send(event);
    } catch (e) {
        console.error("Error creating event: ", e);  
        res.status(400).send(e);
    }
}

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};

const getEvents = async (req, res) => {
    try {
        const { search, sortField = 'date', sortOrder = 'asc', date, page = 1, limit = 10 } = req.query;

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { localization: { $regex: search, $options: 'i' } }
                ]
            };
        }

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const sortOptions = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

        const skip = (page - 1) * limit;
        const events = await Event.find(filter)
                                  .sort(sortOptions)
                                  .skip(skip)
                                  .limit(Number(limit));

        const totalEvents = await Event.countDocuments(filter);

        const formattedEvents = events.map(event => ({
            date: formatDate(event.date),
            name: event.name,
            city: event.localization,
            id: event.eventId
        }));

        res.status(200).json({
            events: formattedEvents,
            total: totalEvents,
            page: Number(page),
            totalPages: Math.ceil(totalEvents / limit)
        });
    } catch (e) {
        console.error("Error in getEvents:", e);
        res.status(500).send(e);
    }
};

const getEventByIdEdit = async (req, res) => {
    try {
        const event = await Event.findOne({ eventId: req.params.id });
        
        if (!event) {
            return res.status(404).send({ error: 'Nie znaleziono wydarzenia o podanym ID.' });
        }

        const isoDate = new Date(event.date).toISOString().slice(0, 10);

        const formattedEvent = {
            date: isoDate, 
            name: event.name,
            localization: event.localization,
            id: event.eventId
        };

        res.status(200).send(formattedEvent);
    } catch (e) {
        console.error("Error fetching event: ", e);
        res.status(500).send({ error: 'Wystąpił błąd podczas pobierania wydarzenia.' });
    }
};

const updateEventByIdEdit = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updates = req.body;

        const updatedEvent = await Event.findOneAndUpdate({ eventId }, updates, { new: true });

        if (!updatedEvent) {
            return res.status(404).send({ error: 'Nie znaleziono wydarzenia o podanym ID.' });
        }

        res.status(200).send({
            message: 'Wydarzenie zostało pomyślnie zaktualizowane.',
            updatedEvent
        });
    } catch (e) {
        console.error("Error updating event: ", e);
        res.status(500).send({ error: 'Wystąpił błąd podczas aktualizacji wydarzenia.' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ eventId: req.params.id });

        if (!event) {
            return res.status(404).send({ error: 'Nie znaleziono wydarzenia o podanym ID.' });
        }

        res.status(200).send({ message: 'Wydarzenie zostało pomyślnie usunięte.' });
    } catch (e) {
        console.error("Error deleting event: ", e); 
        res.status(500).send({ error: 'Wystąpił błąd podczas usuwania wydarzenia.' });
    }
};

const uploadCSVEvent = async (req, res) => {
    try {

        const eventId = req.params.id;
        
        // Sprawdzenie, czy plik został przesłany
        if (!req.file) {
            return res.status(400).send({ error: 'Nie przesłano pliku CSV.' });
        }

        const fileBuffer = req.file.buffer;

        try {
            await processCSV(eventId, fileBuffer);
            res.status(200).send({ message: 'Plik CSV został pomyślnie przetworzony.' });
        } catch (error) {
            console.error('Error processing CSV file:', error);
            res.status(500).send({ error: 'Wystąpił błąd podczas przetwarzania pliku CSV w czasie dodawania do BD.' });
        }

    } catch (error) {
        console.error('Error in uploadCSVEvent:', error);
        res.status(500).send({ error: 'Wystąpił błąd podczas przetwarzania pliku CSV - nieprawidłowy plik CSV.' });
    }
};


const replaceCSVEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        
        // Sprawdzenie, czy plik został przesłany
        if (!req.file) {
            return res.status(400).send({ error: 'Nie przesłano pliku CSV.' });
        }

        const fileBuffer = req.file.buffer;

        // Znajdź wydarzenie
        const event = await Event.findOne({ eventId: eventId });
        if (!event) {
            return res.status(404).send({ error: 'Nie znaleziono wydarzenia o podanym ID.' });
        }

        // Usuń klasyfikacje i resetuj statystyki
        event.classifications = [];
        event.statistics = {
            finish: { total: 0, females: 0, males: 0 },
            non_finish: { total: 0, females: 0, males: 0 },
            total: { total: 0, females: 0, males: 0 },
        };
        await event.save();

        // Usuń wszystkich uczestników powiązanych z tym wydarzeniem
        await Participant.deleteMany({ event: event._id });

        // Przetwórz nowy plik CSV
        try {
            await processCSV(eventId, fileBuffer);
            res.status(200).send({ message: 'Dane zostały pomyślnie zastąpione nowym plikiem CSV.' });
        } catch (error) {
            console.error('Error processing CSV file:', error);
            res.status(500).send({ error: 'Wystąpił błąd podczas przetwarzania pliku CSV i zastępowania danych.' });
        }

    } catch (error) {
        console.error('Error in replaceCSVEvent:', error);
        res.status(500).send({ error: 'Wystąpił błąd podczas zastępowania danych wydarzenia.' });
    }
}

// Funkcja zwracająca wydarzenie wraz z uczestnikami i klasyfikacjami
async function getEventWithDetails(eventId) {
    try {
        const event = await Event.findOne({ eventId: eventId })
            .populate('participants')
            .exec();

        if (!event) {
            throw new Error('Event not found');
        }

        return event;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function processCSV(eventId, fileBuffer) {
    try {
        const event = await Event.findOne({ eventId: eventId });

        if (!event) {
            throw new Error('Nie znaleziono wydarzenia o podanym ID');
        }

        const classificationsMap = new Map();
        const participantsData = [];

        const decodedContent = iconv.decode(fileBuffer, 'win1250');

        const cleanedContent = decodedContent.replace(/^\uFEFF/, '');

        const stream = Readable.from([cleanedContent]);

        const participantColumnMap = {
            'NrZawodnika': 'number',
            'NrChip': 'chip_number',
            'Klasyfikacja': 'classification',
            'Kategoria': 'category',
            'Imie': 'competitorFirstName',
            'Nazwisko': 'competitorLastName',
            'Plec': 'gender',
            'Wiek': 'age',
            'DataUrodzenia': 'date_of_birth',
            'Panstwo': 'country',
            'Miasto': 'location',
            'NazwaKlubu': 'club',
            'Telefon': 'tel',
        };

        await new Promise((resolve, reject) => {
            stream
                .pipe(csv({separator: ';'}))
                .on('data', (row) => {
                    const participantData = {};

                    for (const [csvColumn, modelField] of Object.entries(participantColumnMap)) {
                        if (row[csvColumn] !== undefined) {
                            participantData[modelField] = row[csvColumn].trim();
                        }
                    }

                    if (participantData.number && participantData.chip_number && participantData.classification && participantData.category) {
                        participantData.number = parseInt(participantData.number, 10);
                        participantData.chip_number = parseInt(participantData.chip_number, 10);
                        participantData.age = parseInt(participantData.age, 10);
                        participantData.date_of_birth = new Date(participantData.date_of_birth);

                        participantData.competitor = `${participantData.competitorFirstName} ${participantData.competitorLastName}`;
                        delete participantData.competitorFirstName;
                        delete participantData.competitorLastName;

                        const classificationName = participantData.classification;
                        const categoryName = participantData.category;

                        if (classificationName && categoryName) {

                            if (!classificationsMap.has(classificationName)) {
                                classificationsMap.set(classificationName, new Set());
                            }
                            classificationsMap.get(classificationName).add(categoryName);
                        }
                        participantData.event = event._id;


                        participantsData.push(participantData);
                    } else {
                        console.warn(`Niekompletny wiersz: ${JSON.stringify(row)}`);
                    }
                })
                .on('end', resolve)
                .on('error', reject);
        });



       // Aktualizacja klasyfikacji osadzonych w evencie
       for (const [classificationName, categoriesSet] of classificationsMap) {
            const categoriesArray = Array.from(categoriesSet);

            // Sortowanie kategorii: najpierw te zaczynające się od "K", potem od "M", a następnie inne
            categoriesArray.sort((a, b) => {
                const getPriority = (str) => {
                    if (str.toUpperCase().startsWith('K')) return 1;
                    if (str.toUpperCase().startsWith('M')) return 2;
                    return 3; // Inne kategorie
                };

                const priorityA = getPriority(a);
                const priorityB = getPriority(b);

                if (priorityA !== priorityB) {
                    return priorityA - priorityB;
                }

                // Opcjonalnie: sortowanie alfabetyczne w ramach tej samej grupy
                return a.localeCompare(b);
            });

            // Sprawdzenie, czy klasyfikacja już istnieje
            const existingClassification = event.classifications.find(c => c.name === classificationName);

            if (existingClassification) {
                // Merge kategorii, zapewniając unikalność
                const existingCategories = new Set(existingClassification.categories);
                categoriesArray.forEach(cat => existingCategories.add(cat));
                
                // Konwersja na posortowaną tablicę
                existingClassification.categories = Array.from(existingCategories).sort((a, b) => {
                    const getPriority = (str) => {
                        if (str.toUpperCase().startsWith('K')) return 1;
                        if (str.toUpperCase().startsWith('M')) return 2;
                        return 3;
                    };
        
                    const priorityA = getPriority(a);
                    const priorityB = getPriority(b);
        
                    if (priorityA !== priorityB) {
                        return priorityA - priorityB;
                    }
        
                    return a.localeCompare(b);
                });
            } else {
                // Dodanie nowej klasyfikacji z domyślnymi wartościami
                event.classifications.push({
                    name: classificationName,
                    distance: 0, // Możesz dostosować wartość
                    type_of_event: 'Bieg na czas',
                    date_and_time: new Date(),
                    impuls_number_start: 1,
                    impuls_number_finish: 1,
                    category_open: {
                        exist: true,
                        number_of_position: 3,
                    },
                    category_age: {
                        exist: true,
                        number_of_position: 3,
                    },
                    categories: categoriesArray, // Już posortowana tablica
                    statistics: {
                        finish: { total: 0, females: 0, males: 0 },
                        non_finish: { total: 0, females: 0, males: 0 },
                        total: { total: 0, females: 0, males: 0 },
                    },
                });
            }
        }
        
        await event.save();

        // Bulk operacje na uczestnikach
        const bulkOps = participantsData.map((participantData) => ({
            updateOne: {
                filter: {
                    event: participantData.event,
                    number: participantData.number,
                },
                update: participantData,
                upsert: true,
            },
        }));

        await Participant.bulkWrite(bulkOps);
        await getEventWithDetails(eventId);
        await updateStatistics(eventId);


    } catch (error) {
        console.error('Błąd podczas przetwarzania pliku CSV:', error.message);
        throw error;
    }
}

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).send({ error: err.message });
    } else if (err) {
        return res.status(500).send({ error: err.message });
    }
    next();
};


async function updateStatistics(eventId) {
    try {
        // Znajdź wydarzenie po eventId i pobierz klasyfikacje
        const event = await Event.findOne({ eventId: eventId });
        if (!event) {
            throw new Error('Nie znaleziono wydarzenia o podanym ID');
        }

        // Pobierz wszystkich uczestników dla danego wydarzenia
        const participants = await Participant.find({ event: event._id });

        // Inicjalizacja globalnych statystyk
        const globalStatistics = {
            finish: {
                total: 0,
                females: 0,
                males: 0,
            },
            non_finish: {
                total: 0,
                females: 0,
                males: 0,
            },
            total: {
                total: 0,
                females: 0,
                males: 0,
            },
        };

        // Przejdź przez każdą klasyfikację w wydarzeniu
        event.classifications.forEach(classification => {
            // Filtruj uczestników należących do bieżącej klasyfikacji
            const classificationParticipants = participants.filter(p => p.classification === classification.name);

            // Finishers: uczestnicy z `time_brutto`
            const finishers = classificationParticipants.filter(p => p.time_brutto);
            // Non-Finishers: uczestnicy bez `time_brutto`
            const nonFinishers = classificationParticipants.filter(p => !p.time_brutto);

            // Oblicz statystyki
            const statistics = {
                finish: {
                    total: finishers.length,
                    females: finishers.filter(p => p.gender === 'K').length,
                    males: finishers.filter(p => p.gender === 'M').length,
                },
                non_finish: {
                    total: nonFinishers.length,
                    females: nonFinishers.filter(p => p.gender === 'K').length,
                    males: nonFinishers.filter(p => p.gender === 'M').length,
                },
                total: {
                    total: classificationParticipants.length,
                    females: classificationParticipants.filter(p => p.gender === 'K').length,
                    males: classificationParticipants.filter(p => p.gender === 'M').length,
                },
            };

            // Aktualizuj statystyki w klasyfikacji
            classification.statistics = statistics;


            // Sumuj statystyki do globalnych statystyk wydarzenia
            globalStatistics.finish.total += statistics.finish.total;
            globalStatistics.finish.females += statistics.finish.females;
            globalStatistics.finish.males += statistics.finish.males;

            globalStatistics.non_finish.total += statistics.non_finish.total;
            globalStatistics.non_finish.females += statistics.non_finish.females;
            globalStatistics.non_finish.males += statistics.non_finish.males;

            globalStatistics.total.total += statistics.total.total;
            globalStatistics.total.females += statistics.total.females;
            globalStatistics.total.males += statistics.total.males;
        });

        event.statistics = globalStatistics;

        // Zapisz zaktualizowane wydarzenie
        await event.save();
        console.log(`Statystyki dla wydarzenia ID ${eventId} zostały zaktualizowane.`);
    } catch (error) {
        console.error('Błąd podczas aktualizacji statystyk:', error.message);
        throw error;
    }
}

const getEventStatistics = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({ eventId: eventId }).exec();

        if (!event) {
            return res.status(404).send({ error: 'Nie znaleziono wydarzenia o podanym ID.' });
        }

        // Get the classifications
        const classifications = event.classifications;

        // Prepare the data for tbody
        const tbody = [];

        // For each classification, extract the data
        for (const classification of classifications) {
            const row = {
                name: classification.name,
                distance: classification.distance,
                runners: classification.statistics.total.total,
                onMeta: classification.statistics.finish.total,
                leftMeta: classification.statistics.non_finish.total,
                womenStart: classification.statistics.total.females,
                womenMeta: classification.statistics.finish.females,
                womenLeft: classification.statistics.non_finish.females,
                menStart: classification.statistics.total.males,
                menMeta: classification.statistics.finish.males,
                menLeft: classification.statistics.non_finish.males
            };
            tbody.push(row);
        }

        // Now create the summary row from event.statistics
        const summaryRow = {
            name: 'Suma',
            distance: '',
            runners: event.statistics.total.total,
            onMeta: event.statistics.finish.total,
            leftMeta: event.statistics.non_finish.total,
            womenStart: event.statistics.total.females,
            womenMeta: event.statistics.finish.females,
            womenLeft: event.statistics.non_finish.females,
            menStart: event.statistics.total.males,
            menMeta: event.statistics.finish.males,
            menLeft: event.statistics.non_finish.males
        };

        tbody.push(summaryRow);

        res.status(200).send({ tbody });
    } catch (error) {
        console.error('Error fetching event statistics:', error);
        res.status(500).send({ error: 'Wystąpił błąd podczas pobierania statystyk wydarzenia.' });
    }
};

module.exports = { createEvent, getEvents, deleteEvent, getEventByIdEdit, updateEventByIdEdit, uploadCSVEvent, upload, multerErrorHandler, replaceCSVEvent, getEventStatistics};