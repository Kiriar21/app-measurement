const mongoose = require('mongoose');
const Event = require('../db/Models/Event');
const Participant = require('../db/Models/Participant');
const FileMeasurement = require('../db/Models/FileMeasurement');
const { Readable } = require('stream');
const multer = require('multer');

const csv = require('csv-parser');
const fs = require('fs');
const iconv = require('iconv-lite');
const path = require('path')


const storageMemery = multer.memoryStorage();
const uploadMemory = multer({ 
    storageMemery,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('Nieprawidłowy format pliku. Przesyłaj pliki CSV.'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, 
});

const storageDisk = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const classificationIndex = req.params.index;
        const eventId = req.params.id;
        const fileType = file.fieldname === 'startFile' ? 'start' : 'meta';
        const ext = path.extname(file.originalname);
        cb(null, `${eventId}-classification-${classificationIndex}-${fileType}${ext}`);
    },
});

const uploadDisk = multer({ storage: storageDisk });


const getClassificationsNameFromEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({ eventId: eventId });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const classificationsName = event.classifications.map((classification, index) => ({
            title: classification.name,
            name: index
        }));
        
        res.status(200).json(classificationsName);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching classifications' });
    }
}

const getClassificationFromEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const classificationIndex = parseInt(req.params.index);
        const event = await Event.findOne({ eventId: eventId });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const classification = event.classifications[classificationIndex];

        if (!classification) {
            return res.status(404).json({ error: 'Classification not found' });
        }

        res.status(200).json(classification);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching classification' });
    }
};


const updateClassificationFromEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const classificationIndex = parseInt(req.params.index);

        const { input_file_start, input_file_meta, ...updatedData } = req.body;

        const event = await Event.findOne({ eventId: eventId });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (!event.classifications[classificationIndex]) {
            return res.status(404).json({ error: 'Classification not found' });
        }
        const uploadsPath = path.join(__dirname, '..', '..', 'uploads');

        if (input_file_start) {
            if (!fs.existsSync(path.join(uploadsPath, input_file_start))) {
                return res.status(400).json({ error: 'Start file does not exist' });
            }
            updatedData.input_file_start = path.join(uploadsPath, input_file_start);
        }

        if (input_file_meta) {
            if (!fs.existsSync(path.join(uploadsPath, input_file_meta))) {
                return res.status(400).json({ error: 'Meta file does not exist' });
            }
            updatedData.input_file_meta = path.join(uploadsPath, input_file_meta);
        }


        Object.assign(event.classifications[classificationIndex], updatedData);

        await event.save();

        res.status(200).json({ message: 'Classification updated successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Error updating classification' });
    }
};

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
        
        
        if (!req.file) {
            return res.status(400).send({ error: 'Nie przesłano pliku CSV.' });
        }

        const fileBuffer = req.file.buffer;

        
        const event = await Event.findOne({ eventId: eventId });
        if (!event) {
            return res.status(404).send({ error: 'Nie znaleziono wydarzenia o podanym ID.' });
        }

        
        event.classifications = [];
        event.statistics = {
            finish: { total: 0, females: 0, males: 0 },
            non_finish: { total: 0, females: 0, males: 0 },
            total: { total: 0, females: 0, males: 0 },
        };
        await event.save();

        
        await Participant.deleteMany({ event: event._id });

        
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

        const existingParticipants = await Participant.find({ event: event._id }).select('number');
        const existingNumbers = new Set(existingParticipants.map(p => p.number));


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

                        if (!existingNumbers.has(participantData.number))
                        {
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
                        }
                        
                    } else {
                        console.warn(`Niekompletny wiersz: ${JSON.stringify(row)}`);
                    }
                })
                .on('end', resolve)
                .on('error', reject);
        });



       
       for (const [classificationName, categoriesSet] of classificationsMap) {
            const categoriesArray = Array.from(categoriesSet);

            
            categoriesArray.sort((a, b) => {
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

            
            const existingClassification = event.classifications.find(c => c.name === classificationName);

            if (existingClassification) {
                
                const existingCategories = new Set(existingClassification.categories);
                categoriesArray.forEach(cat => existingCategories.add(cat));
                
                
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
                
                event.classifications.push({
                    name: classificationName,
                    distance: 0, 
                    type_of_event: 'Bieg na czas',
                    date_and_time: '',
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
                    statistics: {
                        finish: { total: 0, females: 0, males: 0 },
                        non_finish: { total: 0, females: 0, males: 0 },
                        total: { total: 0, females: 0, males: 0 },
                    },
                });
            }
        }
        
        await event.save();

        
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
        
        const event = await Event.findOne({ eventId: eventId });
        if (!event) {
            throw new Error('Nie znaleziono wydarzenia o podanym ID');
        }

        
        const participants = await Participant.find({ event: event._id });

        
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

        
        event.classifications.forEach(classification => {
            
            const classificationParticipants = participants.filter(p => p.classification === classification.name);

            
            const finishers = classificationParticipants.filter(p => p.time_brutto);
            
            const nonFinishers = classificationParticipants.filter(p => !p.time_brutto);

            
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

            
            classification.statistics = statistics;


            
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

        
        await event.save();
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

        
        const classifications = event.classifications;

        
        const tbody = [];

        
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

const getUsers = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { search, genderFilter, statusFilter, sortField, sortOrder } = req.query;

        const event = await Event.findOne({ eventId: eventId });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        
        let filter = { event: event._id };

        if (search) {
            const numberSearch = parseInt(search, 10);

            if (!isNaN(numberSearch)) {
                filter.$or = [
                    { number: numberSearch },
                    { competitor: { $regex: search, $options: 'i' } },
                    { club: { $regex: search, $options: 'i' } }
                ];
            } else {
                filter.$or = [
                    { competitor: { $regex: search, $options: 'i' } },
                    { club: { $regex: search, $options: 'i' } }
                ];
            }
        }

        if (genderFilter && ['K', 'M'].includes(genderFilter)) {
            filter.gender = genderFilter;
        }

        if (statusFilter) {
            if (statusFilter === 'START') {
                filter.status = 'START';
            } else if (statusFilter === 'NOT_START') {
                filter.status = { $ne: 'START' };
            }
        }

        
        const sortOptions = {};
        if (sortField) {
            const order = sortOrder === 'desc' ? -1 : 1;
            sortOptions[sortField] = order;
        } else {
            sortOptions.number = 1; 
        }

        const participants = await Participant.find(filter).sort(sortOptions);

        const tbody = participants.map((participant, index) => ({
            counter: index + 1,
            number: participant.number,
            competitor: participant.competitor,
            gender: participant.gender,
            age: participant.age,
            date_of_birth: participant.date_of_birth.toISOString().split('T')[0],
            classification: participant.classification,
            category: participant.category,
            country: participant.country,
            club: participant.club,
            status: participant.status,
            location: participant.location,
        }));

        res.status(200).json(tbody);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching participants' });
    }
};


const getUser = async (req, res) => {
    try {
        const eventId = req.params.id;
        const number = req.params.number;
    
        const event = await Event.findOne({ eventId: eventId });
        
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }   

        const participant = await Participant.findOne({ event: event._id, number });

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }
    
        res.status(200).json(participant);
        } catch (error) {
        res.status(500).json({ error: 'Error fetching participant' });
        }
  }; 

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    return today.getFullYear() - birthDate.getFullYear();
  };
  

  const editUser = async (req, res) => {
    try {
      const eventId = req.params.id;
      const number = req.params.number;
      const updateData = req.body; 
  
      const event = await Event.findOne({ eventId: eventId });
        
      if (!event) {
          return res.status(404).json({ error: 'Event not found' });
      } 

      if (updateData.date_of_birth) {
        updateData.age = calculateAge(updateData.date_of_birth); 
      }

      const participant = await Participant.findOneAndUpdate(
        { event: event._id, number },
        updateData,
        { new: true }
      );
  
      if (!participant) {
        return res.status(404).json({ error: 'Participant not found' });
      }
  
      res.status(200).json({ message: 'Participant updated', participant });
    } catch (error) {
      res.status(500).json({ error: 'Error updating participant' });
    }
  };

  const deleteUser = async (req, res) => {
    try {
        const eventId = req.params.id;
        const number = req.params.number;

        const event = await Event.findOne({ eventId: eventId });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const participant = await Participant.findOneAndDelete({
            event: event._id,
            number: number
        });

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        } else {
            updateStatistics(eventId);
            res.status(200).json({ message: 'Participant deleted successfully' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Error deleting participant' });
    }
};


const getAvailableFiles = async (req, res) => {
    try {
        const targetPath = path.join(__dirname, '..', '..', 'uploads');
        const files = fs.readdirSync(targetPath);
        res.status(200).json({ files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching files' });
    }
};


const processFile = async (filePath, eventId, classificationId, type) => {
    await fs.promises.access(filePath).catch(() => { 
        return;
    } );


    const existingFileMeasurement = await FileMeasurement.findOne({ eventId, classificationId, type });

    let maxCounter = existingFileMeasurement?.data?.reduce((max, input) => Math.max(max, input.counter), 0) || 0;

    const newInputs = [];
    const fileStream = fs.createReadStream(filePath).pipe(iconv.decodeStream('win1250'));

    await new Promise((resolve, reject) => {
        fileStream
            .pipe(csv({ separator: ',', headers: false })) 
            .on('data', (row) => {
                const counter = parseInt(row[1]);
                if (counter > maxCounter) {
                    newInputs.push({
                        name_gate: row[0], 
                        counter,
                        name_file: row[2], 
                        chip_number: parseInt(row[3]), 
                        time: row[4], 
                        impuls: parseInt(row[5]), 
                        gate: row[6], 
                        power_of_impuls: parseInt(row[7]), 
                    });
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });

    if (newInputs.length > 0) {
        await FileMeasurement.updateOne(
            { eventId, classificationId, type },
            { $push: { data: { $each: newInputs } } },
            { upsert: true }
        );
    }
};


const updateDataFromFiles = async (req, res) => {
    try {
        const { id } = req.params;

        // Pobierz wydarzenie
        const event = await Event.findOne({ eventId: id });
        if (!event) return res.status(404).json({ error: 'Event not found' });

        // Iteruj przez wszystkie klasyfikacje
        for (const classification of event.classifications) {
            const classificationId = classification._id;
            // Sprawdź, czy pliki istnieją
            if (classification.input_file_start) {
                const fileMeasurements = await FileMeasurement.find({
                    eventId: event._id,
                    classificationId,
                });
                const fileMeasurementStart = fileMeasurements.find(measurement => measurement.type === 'Start');
                

                if (!fileMeasurementStart) {
                    // Utwórz nowy FileMeasurement jeśli nie istnieje
                    fileMeasurementStart = new FileMeasurement({
                        eventId: event._id,
                        classificationId,
                        type: 'Start',
                        data: [], // Początkowo pusta tablica danych
                    });
                    await fileMeasurementStart.save();
                }

            }
            // Sprawdzenie i utworzenie FileMeasurement dla Meta
            if (classification.input_file_meta) {

                const fileMeasurements = await FileMeasurement.find({
                    eventId: event._id,
                    classificationId,
                });
                const fileMeasurementMeta = fileMeasurements.find(measurement => measurement.type === 'Meta');
                

                if (!fileMeasurementMeta) {
                    // Utwórz nowy FileMeasurement jeśli nie istnieje
                    fileMeasurementMeta = new FileMeasurement({
                        eventId: event._id,
                        classificationId,
                        type: 'Meta',
                        data: [], // Początkowo pusta tablica danych
                    });
                    await fileMeasurementMeta.save();
                }

            }

            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                if (classification.input_file_start && (classification.input_file_meta)){
                    await Promise.all([
                        processFile(classification.input_file_start, event._id, classificationId, 'Start'),
                        processFile(classification.input_file_meta, event._id, classificationId, 'Meta')
                    ])
                } else if(classification.input_file_start){
                    processFile(classification.input_file_start, event._id, classificationId, 'Start')
                } else if(classification.input_file_meta){
                    processFile(classification.input_file_meta, event._id, classificationId, 'Meta')
                }

                await session.commitTransaction();
            } catch (error) {
                await session.abortTransaction();
                throw error;
            } finally {
                session.endSession();
            }

        }


        

        res.status(200).json({ message: 'Data updated successfully for all classifications' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating data' });
    }
};


module.exports = {
    createEvent, 
    getEvents, 
    deleteEvent, 
    getEventByIdEdit, 
    updateEventByIdEdit, 
    uploadCSVEvent, 
    uploadMemory, 
    uploadDisk,
    multerErrorHandler, 
    replaceCSVEvent, 
    getEventStatistics, 
    getUsers, 
    getUser, 
    editUser, 
    deleteUser, 
    getClassificationsNameFromEvent, 
    getClassificationFromEvent,
    updateClassificationFromEvent,

    getAvailableFiles,
    updateDataFromFiles,
};