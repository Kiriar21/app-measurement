const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Pole "event" jest wymagane'],
    },
    number: {
        type: Number,
        required: [true, 'Numer startowy jest wymagany'],
        min: [1, 'Numer startowy musi być większy lub równy 1'],
    },
    chip_number: {
        type: Number,
        required: [true, 'Numer chipa jest wymagany'],
        min: [1, 'Numer chipa musi być większy lub równy 1'],
    },
    classification: {
        type: String,
        required: [true, 'Klasyfikacja jest wymagana'],
        trim: true,
        minlength: [2, 'Klasyfikacja musi mieć co najmniej 2 znaki'],
    },
    category: {
        type: String,
        required: [true, 'Kategoria jest wymagana'],
        trim: true,
        minlength: [2, 'Kategoria musi mieć co najmniej 2 znaki'],
    },
    competitor: {
        type: String,
        required: [true, 'Imię i nazwisko uczestnika jest wymagane'],
        trim: true,
        minlength: [3, 'Imię i nazwisko musi mieć co najmniej 3 znaki'],
    },
    gender: {
        type: String,
        required: [true, 'Płeć jest wymagana'],
        enum: {
            values: ['K', 'M'],
            message: 'Płeć musi być "K" lub "M"',
        },
    },
    age: {
        type: Number,
        required: [true, 'Wiek jest wymagany'],
        min: [0, 'Wiek nie może być ujemny'],
    },
    date_of_birth: {
        type: Date,
        required: [true, 'Data urodzenia jest wymagana'],
    },
    country: {
        type: String,
        required: [true, 'Kraj jest wymagany'],
        trim: true,
    },
    location: {
        type: String,
        default: '',
        trim: true,
    },
    club: {
        type: String,
        default: '',
        trim: true,
    },
    tel: {
        type: String,
        default: '',
        trim: true,
    },
    // REST
    status: {
        type: String,
        enum: {
            values: ['DNF', 'DNS', 'DNQ', 'START'],
            message: 'Status musi być jedną z wartości: DNF, DNS, DNQ, START',
        },
        default: 'START',
    },
    time_start: {
        type: String,
        default: '',
    },
    time_end: {
        type: String,
        default: '',
    },
    time_netto: {
        type: String,
        default: '',
    },
    time_brutto: {
        type: String,
        default: '',
    },
    avg_speed: {
        type: String,
        default: '',
    },
    avg_rate: {
        type: String,
        default: '',
    },
    diff_time: {
        type: String,
        default: '',
    },
    place: {
        type: Number,
        default: '',
    },
    place_gender: {
        type: Number,
        default: '',
    },
    place_age: {
        type: Number,
        default: '',
    },
}, {
    timestamps: true,
});

ParticipantSchema.index({ event: 1, number: 1 }, { unique: true });

const Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;
