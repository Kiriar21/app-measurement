const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    model: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
