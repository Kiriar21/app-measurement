const Event = require('../db/Models/Event');

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

        // Konwersja daty do formatu YYYY-MM-DD dla input typu date w HTML
        const isoDate = new Date(event.date).toISOString().slice(0, 10);

        const formattedEvent = {
            date: isoDate,  // Data w formacie YYYY-MM-DD
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

module.exports = { createEvent, getEvents, deleteEvent, getEventByIdEdit, updateEventByIdEdit};