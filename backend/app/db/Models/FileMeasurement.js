const mongoose = require('mongoose');
const InputSchema = require('./Input');

const FileMeasurementSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    classificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classification',
    },
    type: {
        type: String,
        enum: {
            values: ['Start', 'Meta'],
            message: 'Typ pliku musi być typu Start lub Meta',
        },
    },
    data: [InputSchema],
});

const FileMeasurement = mongoose.model('FileMeasurement', FileMeasurementSchema);

module.exports = FileMeasurement;
