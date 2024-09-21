const Event = require('../db/Models/Event');
const Participant = require('../db/Models/Participant');
const FileMeasurement = require('../db/Models/FileMeasurement');
const { Readable } = require('stream');
const csv = require('csv-parser');
const iconv = require('iconv-lite');

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};

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

const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    return today.getFullYear() - birthDate.getFullYear();
};

async function updateTimesParticipant(id) {

    try {
        let participants = await Participant.find({
            $or: [
                { time_end: { $exists: false } },  
                { time_end: "" }  
            ]
        });
        
        participants.filter( p => p.status === 'START');
        
        for (const participant of participants) {
            const eventId = participant.event;
            const classificationName = participant.classification;

            const event = await Event.findById(eventId);

            const classification = event.classifications.find(c => c.name === classificationName);

            if (!classification) continue;

            const { impuls_number_start, impuls_number_finish, date_and_time } = classification;
            const classificationId = classification._id;

            const fileMeta = await FileMeasurement.findOne({
                eventId: eventId,
                classificationId: classificationId,
                type: 'Meta'
            });

            if (!fileMeta) continue;

            const metaInput = fileMeta.data.find(input =>
                input.chip_number === participant.chip_number &&
                input.impuls === impuls_number_finish
            );

            if (!metaInput) continue;

            participant.time_end = metaInput.time;

            const fileStart = await FileMeasurement.findOne({
                eventId: eventId,
                classificationId: classificationId,
                type: 'Start'
            });

            if (fileStart) {
                const startInput = fileStart.data.find(input =>
                    input.chip_number === participant.chip_number &&
                    input.impuls === impuls_number_start
                );

                if (startInput) {
                    participant.time_start = startInput.time;
                } else {
                    participant.time_start = date_and_time;
                }
            } else {
                participant.time_start = date_and_time;
            }

            await participant.save();
        }

        await calculateParticipantResults(id);

        
    } catch (error) {
        console.error('Błąd w updateTimesParticipant:', error.message);
        throw error;
    }
};

async function calculateParticipantResults(id) {
    try {
        const event = await Event.findOne({eventId: id});

        if (!event) throw new Error('Nie znaleziono wydarzenia');

        const participants = (await Participant.find({ event: event._id })).filter(p => p.time_start && p.time_end && p.status === 'START');

        const classificationSettings = {};

        event.classifications.forEach(classification => {
            classificationSettings[classification.name] = classification;
        });

        const participantsByClassification = {};

        participants.forEach(participant => {
            if (!participantsByClassification[participant.classification]) {
                participantsByClassification[participant.classification] = [];
            }
            participantsByClassification[participant.classification].push(participant);
        });


        for (const classificationName in participantsByClassification) {
            const participantsInClass = participantsByClassification[classificationName];

            const classification = classificationSettings[classificationName];

            if (!classification) continue;

            const distance = classification.distance;
            const date_and_time = classification.date_and_time;

            const categoryOpenExist = classification.category_open.exist;
            const numberOfOpenPositions = classification.category_open.number_of_position;

            for (const participant of participantsInClass) {
                if (participant.time_end && participant.time_start) {
                    participant.time_netto = timeDifference(participant.time_start, participant.time_end);
                } else {
                    participant.time_netto = null;
                }

                if (participant.time_end) {
                    participant.time_brutto = timeDifference(date_and_time, participant.time_end);
                } else {
                    participant.time_brutto = null;
                }

                if (participant.time_brutto) {
                    const timeBruttoSeconds = timeStringToSeconds(participant.time_brutto);

                    if (timeBruttoSeconds > 0 && distance > 0) {
                        const timeInHours = timeBruttoSeconds / 3600;
                        const timeInMinutes = timeBruttoSeconds / 60;
                        participant.avg_speed = (distance / timeInHours).toFixed(2);
                        participant.avg_rate = minutesToTimeString((timeInMinutes / distance).toFixed(2), participant.number);
                    } else {
                        participant.avg_speed = null;
                        participant.avg_rate = null;
                    }
                } else {
                    participant.avg_speed = null;
                    participant.avg_rate = null;
                }
            }

            const finishers = participantsInClass.filter(p => p.time_brutto);

            finishers.sort((a, b) => {
                const timeA = timeStringToSeconds(a.time_brutto);
                const timeB = timeStringToSeconds(b.time_brutto);
                return timeA - timeB;
            });

            if (finishers.length > 0) {
                const fastestTime = timeStringToSeconds(finishers[0].time_brutto);
                let place = 1;
                let placeGender = {};
                let placeAge = { M: numberOfOpenPositions + 1, K: numberOfOpenPositions + 1 };

                finishers.forEach(participant => {
                    participant.place = place++;

                    const participantTime = timeStringToSeconds(participant.time_brutto);
                    const diffSeconds = participantTime - fastestTime;
                    participant.diff_time = diffSeconds > 0 ? ("+" + secondsToTimeString(diffSeconds)) : "" ;

                    const gender = participant.gender;
                    if (!placeGender[gender]) {
                        placeGender[gender] = 1;
                    }
                    participant.place_gender = placeGender[gender]++;
                    
                    const category = participant.category;
                    if (!placeAge[category]) {
                        placeAge[category] = 1;
                    }

                    if(classification.category_open.exist) {
                        if (participant.place_gender > numberOfOpenPositions) {
                            participant.place_age = placeAge[category]++;
                        } else {
                            participant.place_age = null; 
                        }
                    } else {
                        participant.place_age = placeAge[category]++;
                    }
                });
            }

            for (const participant of participantsInClass) {
                await participant.save();
            }
        }

        await updateStatistics(event.eventId);

    } catch (error) {
        console.error('Błąd w calculateParticipantResults:', error.message);
        throw error;
    }
}

function minutesToTimeString(minutesPerKm, id) {
    const totalSeconds = Math.floor(minutesPerKm * 60);
    const milliseconds = Math.floor((minutesPerKm * 60 - totalSeconds) * 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = [
        String(hours).padStart(2, '0'),     
        String(minutes).padStart(2, '0'), 
        String(seconds).padStart(2, '0')   
    ].join(':') + '.' + String(milliseconds).padStart(3, '0'); 

    return formattedTime;
}

function timeStringToSeconds(timeStr) {
    const [hhmmss, mmm] = timeStr.split('.');
    const [hours, minutes, seconds] = hhmmss.split(':').map(Number);
    const milliseconds = mmm ? Number(mmm) : 0;
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}

function timeDifference(startTimeStr, endTimeStr) {
    const startSeconds = timeStringToSeconds(startTimeStr);
    const endSeconds = timeStringToSeconds(endTimeStr);
    const diffSeconds = endSeconds - startSeconds;
    return secondsToTimeString(diffSeconds);
}

function secondsToTimeString(totalSeconds) {
    const sign = totalSeconds < 0 ? '-' : '';
    totalSeconds = Math.abs(totalSeconds);

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds -= hours * 3600;

    const minutes = Math.floor(totalSeconds / 60);
    totalSeconds -= minutes * 60;

    const seconds = Math.floor(totalSeconds);
    const milliseconds = Math.round((totalSeconds - seconds) * 1000);

    return `${sign}${hours >= 10 ? hours : '0'+hours}:${padZero(minutes >= 10 ? minutes : '0'+minutes)}:${padZero(seconds >= 10 ? seconds : '0'+seconds)}.${padMilliseconds(milliseconds > 0 ? milliseconds : '000')}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function padMilliseconds(num) {
    return num.toString().padStart(3, '0');
}

module.exports ={
    formatDate,
    getEventWithDetails,
    processCSV,
    updateStatistics,
    calculateAge,
    updateTimesParticipant,
    calculateParticipantResults,
    minutesToTimeString,
    timeStringToSeconds,
    timeDifference,
    secondsToTimeString,
    padZero,
    padMilliseconds,
}