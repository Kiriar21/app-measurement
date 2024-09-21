const Event = require('../db/Models/Event');
const fs = require('fs');
const path = require('path')

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
};

const getClassificationFromEvent = async (req, res) => {
    try {
        const {id, index} = req.params;
        const event = await Event.findOne({ eventId: id });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const classification = event.classifications[index];

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
        const {id, index} = req.params;

        const updatedData = req.body;

        const event = await Event.findOne({ eventId: id });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (!event.classifications[index]) {
            return res.status(404).json({ error: 'Classification not found' });
        }

        const targetPath = path.join(__dirname, '..', '..', 'uploads');
        const files = fs.readdirSync(targetPath)

        if(updatedData.input_file_start != "") {
            if(!files.includes(updatedData.input_file_start)) {
                return res.status(404).json({ error: 'File not found' });
            }
        }

        if(updatedData.input_file_meta != "") {
            if(!files.includes(updatedData.input_file_meta)) {
                return res.status(404).json({ error: 'File not found' });
            }
        }

        Object.assign(event.classifications[index], updatedData);

        await event.save();

        res.status(200).json({ message: 'Classification updated successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Error updating classification' });
    }
};

const getCategoriesFromClassification = async (req, res) => {
    try {
        const { id, index } = req.params;
        const event = await Event.findOne({ eventId: id });
        if (!event) {
            return res.status(404).json({ error: 'Nie znaleziono wydarzenia' });
        }

        const classification = event.classifications[index];
        if (!classification) {
            return res.status(404).json({ error: 'Nie znaleziono klasyfikacji' });
        }

        const categories = classification.categories.map(categoryName => ({
            title: categoryName,
            name: categoryName
        }));

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania kategorii' });
    }
};

module.exports = {
    getClassificationsNameFromEvent,
    getClassificationFromEvent,
    updateClassificationFromEvent,
    getCategoriesFromClassification,
};