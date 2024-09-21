const Event = require('../db/Models/Event');
const Participant = require('../db/Models/Participant');
const FileMeasurement = require('../db/Models/FileMeasurement');
const csv = require('csv-parser');
const fs = require('fs');
const iconv = require('iconv-lite');
const path = require('path')
const archiver = require('archiver');
const {stringify} = require('csv-stringify');
const {   
    updateTimesParticipant,
} = require('./Functions')

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
    
    filePath = path.join(__dirname, '..', '..', 'uploads', filePath);
    
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

        const event = await Event.findOne({ eventId: id });
        if (!event) return res.status(404).json({ error: 'Event not found' });

        for (const classification of event.classifications) {
            const classificationId = classification._id;

                if (classification.input_file_start) {
                    await FileMeasurement.findOneAndUpdate(
                        { eventId: event._id, classificationId, type: 'Start' },
                        {
                          $setOnInsert: { eventId: event._id, classificationId, type: 'Start', data: [] },
                        },
                        { upsert: true, new: true }
                      );
                }

                if (classification.input_file_meta) {
                    await FileMeasurement.findOneAndUpdate(
                        { eventId: event._id, classificationId, type: 'Meta' },
                        {
                            $setOnInsert: {eventId: event._id, classificationId, type: 'Meta', data: [] }
                        },
                        { upsert: true, new: true } 
                    );
                }

                if (classification.input_file_start && classification.input_file_meta) {
                    await Promise.all([
                        processFile(classification.input_file_start, event._id, classificationId, 'Start'),
                        processFile(classification.input_file_meta, event._id, classificationId, 'Meta')
                    ]);
                } else if (classification.input_file_start) {
                    await processFile(classification.input_file_start, event._id, classificationId, 'Start');
                } else if (classification.input_file_meta) {
                    await processFile(classification.input_file_meta, event._id, classificationId, 'Meta');
                }       
        }

        updateTimesParticipant(id);

        res.status(200).json({ message: 'Data updated successfully for all classifications', isUpdatedFinished: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating data' });
    }
};

const getScoresZIP = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findOne({eventId: id});
        if (!event) {
            return res.status(404).json({ message: 'Nie znaleziono wydarzenia' });
        }

        const participants = await Participant.find({ event: event._id, time_brutto: { $exists: true, $ne: '' }, status: { $eq: 'START'} });

        const participantsByClassification = {};

        participants.forEach(participant => {
            if (!participantsByClassification[participant.classification]) {
                participantsByClassification[participant.classification] = [];
            }
            participantsByClassification[participant.classification].push(participant);
        });

        const archive = archiver('zip', { zlib: { level: 9 } });

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; name="fieldName"; filename="filename.jpg"');

        archive.pipe(res);

        for (const classificationName in participantsByClassification) {
            const participantsInClass = participantsByClassification[classificationName];
                
            participantsInClass.sort((a, b) => a.place - b.place);

            const records = participantsInClass.map(p => {
                return {
                    'Nr': p.number,
                    'Miejsce OPEN': p.place,
                    'Miejsce Plec': p.place_gender,
                    'Miejsce Kat Wiek': p.place_age,
                    'Zawodnik': p.competitor,
                    'Klasyfikacja': p.classification,
                    'Kategoria': p.category,
                    'Czas Netto': String(p.time_netto), 
                    'Czas brutto': String(p.time_brutto),
                    'Srednia Predkosc': String(p.avg_speed),
                    'Srednie Tempo': String(p.avg_rate),
                    'Strata': String(p.diff_time),
                    'Plec': p.gender,
                    'Wiek': p.age,
                    'Kraj': p.country,
                    'Miasto': p.location,
                    'Klub': p.club,
                };
            });

            const headers = [
                'Nr','Miejsce OPEN','Miejsce Plec','Miejsce Kat Wiek','Zawodnik','Klasyfikacja','Kategoria',
                'Czas Netto','Czas brutto','Srednia Predkosc','Srednie Tempo','Strata',
                'Plec','Wiek','Kraj','Miasto','Klub',
            ];

            const bom = '\uFEFF'; 

            const csvContent = await new Promise((resolve, reject) => {
                stringify(records, { header: true, columns: headers, delimiter: ';' }, (err, output) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(bom + output);
                });
            });

            archive.append(csvContent, { name: `${classificationName}.csv` });
        }

        archive.finalize();

    } catch (error) {
        console.error('Błąd w downloadResults:', error.message, error);
        res.status(500).json({ message: 'Wystąpił błąd podczas generowania wyników.', error: error.message });
    }
};

module.exports = {
    getAvailableFiles,
    updateDataFromFiles,
    getScoresZIP,
}