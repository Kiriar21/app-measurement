const Event = require('../db/Models/Event');
const Participant = require('../db/Models/Participant');
const {   
    processCSV,
    updateStatistics,
    calculateAge,
} = require('./Functions')

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
        if ((updateData.status && updateData.status !== 'START') || (updateData.time_end && updateData.time_end == "")) {
            updateData.time_start = "";
            updateData.time_end = "";
            updateData.time_netto = "";
            updateData.time_brutto = "";
            updateData.avg_speed = "";
            updateData.avg_rate = "";
            updateData.diff_time = "";
            updateData.place = "";
            updateData.place_gender = "";
            updateData.place_age = "";
        } 

        if(updateData.time_start && updateData.time_start == "") {
            updateData.time_start = "";
            updateData.time_netto = "";
        }

        const participant = await Participant.findOneAndUpdate(
            { event: event._id, number },
            updateData,
            { new: true }
        );
        
        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }

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

const getParticipantsByCategory = async (req, res) => {
    try {
        const { search, genderFilter, statusFilter } = req.query;
        const { id, index, category } = req.params;
        const event = await Event.findOne({ eventId: id });

        if (!event) {
            return res.status(404).json({ error: 'Nie znaleziono wydarzenia' });
        }

        const classification = event.classifications[index];

        if (!classification) {
            return res.status(404).json({ error: 'Nie znaleziono klasyfikacji' });
        }

        const classificationName = classification.name;

        let participants = await Participant.find({ event: event._id, classification: classificationName});

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            participants = participants.filter(p => searchRegex.test(p.competitor) || searchRegex.test(p.number.toString()));
        }
        
        if (genderFilter) {
            participants = participants.filter(p => p.gender === genderFilter);
        }

        if (statusFilter) {
            if(statusFilter === 'active') {
                participants = participants.filter(p => p.status === 'START');
            } else {
                participants = participants.filter(p => p.status !== 'START');
            }
        }

        if (category === 'open') {
            const data = participants.sort((a, b) => {
                if (a.place == null || a.place === 0) return 1;  
                if (b.place == null || b.place === 0) return -1; 
                return a.place - b.place; 
            }).map(p => ({
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
                'Status': p.status,
            }));
            res.status(200).json(data);

        } else if (category === 'decoration') {
            const results = [];

            if (classification.category_open.exist && classification.category_open.number_of_position > 0) {
                const numPositions = classification.category_open.number_of_position;

                const males = participants
                    .filter(p => p.gender === 'M' && p.place && p.place >= 1)
                    .sort((a, b) => {
                        if (a.place_gender == null || a.place_gender === 0) return 1;
                        if (b.place_gender == null || b.place_gender === 0) return -1;
                        return a.place_gender - b.place_gender;
                    })
                    .slice(0, numPositions);
                                        
                const females = participants
                    .filter(p => p.gender === 'K' && p.place && p.place >= 1)
                    .sort((a, b) => {
                        if (a.place_gender == null || a.place_gender === 0) return 1;
                        if (b.place_gender == null || b.place_gender === 0) return -1;
                        return a.place_gender - b.place_gender;
                    })
                    .slice(0, numPositions);

                if (males.length > 0) {
                    results.push({
                        group: 'Mężczyźni OPEN',
                        data: males.map(p => ({
                            'Nr': p.number,
                            'Miejsce OPEN': p.place,
                            'Miejsce Plec': p.place_gender,
                            'Miejsce Kat Wiek': p.place_age,
                            'Zawodnik': p.competitor,
                            'Klasyfikacja': p.classification,
                            'Kategoria': p.category,
                            'Czas Netto': p.time_netto,
                            'Czas brutto': String(p.time_brutto),
                            'Srednia Predkosc': String(p.avg_speed),
                            'Srednie Tempo': String(p.avg_rate),
                            'Strata': String(p.diff_time),
                            'Plec': p.gender,
                            'Wiek': p.age,
                            'Kraj': p.country,
                            'Miasto': p.location,
                            'Klub': p.club,
                            'Status': p.status,
                        }))
                    });
                }

                if (females.length > 0) {
                    results.push({
                        group: 'Kobiety OPEN',
                        data: females.map(p => ({
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
                            'Status': p.status,
                        }))
                    });
                }
            }

            if (classification.category_age.exist && classification.category_age.number_of_position > 0) {
                const numPositions = classification.category_age.number_of_position;
                const categories = classification.categories;

                for (const cat of categories) {
                    const participantsInCategory = participants
                        .filter(p => p.category === cat && p.place && p.place >= 1)
                        .sort((a, b) => {
                            if (a.place_age == null || a.place_age === 0) return 1;
                            if (b.place_age == null || b.place_age === 0) return -1;
                            return a.place_age - b.place_age;
                        })
                        .slice(0, numPositions);


                    if (participantsInCategory.length > 0) {
                        results.push({
                            group: `Kategoria ${cat}`,
                            data: participantsInCategory.map(p => ({
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
                                'Status': p.status,
                            }))
                        });
                    }
                }
            }

            res.status(200).json(results);

        } else {
            const participantsInCategory = participants
                .filter(p => p.category === category)
                .sort((a, b) => {
                    if (a.place == null || a.place === 0) return 1;
                    if (b.place == null || b.place === 0) return -1;
                    return a.place - b.place;
                });


            const data = participantsInCategory.map(p => ({
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
                'Status': p.status,
            }));

            res.status(200).json(data);
        }

    } catch (error) {
        console.error('Błąd podczas pobierania uczestników:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania uczestników' });
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
};

module.exports = {
    getUsers,
    getUser,
    editUser,
    deleteUser,
    getParticipantsByCategory,
    uploadCSVEvent,
    replaceCSVEvent,
}