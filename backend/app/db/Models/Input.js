const mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
    name_gate: {
        type: String,
        default: '',
    },
    counter: {
        type: Number,
        default: 0,
    },
    name_file: {
        type: String,
        default: '',
    },
    chip_number: {
        type: Number,
        default: 0,
    },
    time: {
        type: String,
        default: '',
    },
    impuls: {
        type: Number,
        default: 0,
    },
    gate: {
        type: String,
        default: '',
    },
    power_of_impuls: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = InputSchema;
