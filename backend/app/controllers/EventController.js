const Event = require('../db/Models/Event');
const Participant = require('../db/Models/Participant');
const Classification = require('../db/Models/Classification');
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

        console.log("Updates: ", updates);

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
        console.log("Przesłany plik: ", req.file);
        console.log("Przesłane pola: ", req.body);
        
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

// Funkcja zwracająca wydarzenie wraz z uczestnikami i klasyfikacjami
async function getEventWithDetails(eventId) {
    try {
        const event = await Event.findOne({ eventId: eventId })
            .populate('participants')
            .populate('classifications')
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

//Przekształcanie pliku CSV na dane uczestników i klasyfikacje
async function processCSV(eventId, fileBuffer) {
    try {
        const event = await Event.findOne({ eventId: eventId });

        if (!event) {
            throw new Error('Nie znaleziono wydarzenia o podanym ID');
        }

        const classificationsMap = new Map();
        const participantsData = [];

        // Dekodowanie bufora na UTF-8
        let decodedContent = iconv.decode(fileBuffer, 'utf8');

        // Usunięcie BOM, jeśli obecny
        decodedContent = decodedContent.replace(/^\uFEFF/, '');

        // Tworzenie strumienia z bufora
        const stream = Readable.from(fileBuffer);

        await new Promise((resolve, reject) => {
            stream
                .pipe(csv())
                .on('data', (row) => {
                    const classificationName = row['Klasyfikacja'];
                    const categoryName = row['Kategoria'];

                    if (classificationName && categoryName) {
                        console.log(`Klasyfikacja: ${classificationName}, Kategoria: ${categoryName}`);

                        // Zbieranie unikalnych klasyfikacji i kategorii
                        if (!classificationsMap.has(classificationName)) {
                            classificationsMap.set(classificationName, new Set());
                        }
                        classificationsMap.get(classificationName).add(categoryName);
                    } else {
                        console.warn(`Brak Klasyfikacji lub Kategorii w wierszu: ${JSON.stringify(row)}`);
                    }

                    // Przygotowanie danych uczestnika
                    const participantData = {
                        event: event._id,
                        number: parseInt(row['NrZawodnika'], 10),
                        chip_number: parseInt(row['NrChip'], 10),
                        classification: classificationName,
                        category: categoryName,
                        competitor: `${row['Imie']} ${row['Nazwisko']}`,
                        gender: row['Plec'],
                        age: parseInt(row['Wiek'], 10),
                        date_of_birth: new Date(row['DataUrodzenia']),
                        country: row['Panstwo'],
                        location: row['Miasto'] || '',
                        club: row['NazwaKlubu'] || '',
                        tel: row['Telefon'] || '',
                    };

                    participantsData.push(participantData);
                })
                .on('end', resolve)
                .on('error', reject);
        });

        // Logowanie zawartości classificationsMap
        console.log('ClassificationsMap:', classificationsMap);


        // Tworzenie lub aktualizacja klasyfikacji
        for (const [classificationName, categoriesSet] of classificationsMap) {
            const categoriesArray = Array.from(categoriesSet);

            console.log(`Aktualizacja/Tworzenie klasyfikacji: ${classificationName}, kategorie: ${categoriesArray}`);

            try {
                await Classification.findOneAndUpdate(
                    { event: event._id, name: classificationName },
                    {
                        event: event._id,
                        name: classificationName,
                        distance: 0,
                        type_of_event: 'Bieg na czas',
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
                        categories: categoriesArray,
                    },
                    { new: true, upsert: true, runValidators: true }
                );
            } catch (err) {
                console.error(`Błąd przy aktualizacji/tworzeniu klasyfikacji "${classificationName}":`, err);
            }
        }

        // Wstawianie uczestników
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

        // Wywołanie przypisania uczestników i klasyfikacji do wydarzenia
        await getEventWithDetails(eventId);

        console.log('Plik CSV został pomyślnie przetworzony');
    } catch (error) {
        console.error('Błąd podczas przetwarzania pliku CSV:', error.message);
        throw error;
    }
}

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Obsługa błędów Multer
        return res.status(400).send({ error: err.message });
    } else if (err) {
        // Inne błędy
        return res.status(500).send({ error: err.message });
    }
    next();
};

module.exports = { createEvent, getEvents, deleteEvent, getEventByIdEdit, updateEventByIdEdit, uploadCSVEvent, upload, multerErrorHandler};