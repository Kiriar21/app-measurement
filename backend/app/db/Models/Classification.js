const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassificationSchema = new Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Pole "event" jest wymagane'],
    },
    name: {
        type: String,
        required: [true, 'Nazwa klasyfikacji jest wymagana'],
        trim: true,
        minlength: [3, 'Nazwa klasyfikacji musi mieć co najmniej 3 znaki'],
    },
    distance: {
        type: Number,
        required: [true, 'Dystans jest wymagany'],
        min: [0, 'Dystans nie może być ujemny'],
    },
    type_of_event: {
        type: String,
        required: [true, 'Typ wydarzenia jest wymagany'],
        trim: true,
        default: 'Bieg na czas',
        minlength: [3, 'Typ wydarzenia musi mieć co najmniej 3 znaki'],
    },
    date_and_time: {
        type: Date,
        required: [true, 'Data i czas wydarzenia są wymagane'],
        default: Date.now,
    },
    impuls_number_start: {
        type: Number,
        required: [true, 'Numer impulsu startu jest wymagany'],
        min: [1, 'Numer impulsu startu musi być większy lub równy 1'],
        default: 1,
    },
    impuls_number_finish: {
        type: Number,
        required: [true, 'Numer impulsu mety jest wymagany'],
        min: [1, 'Numer impulsu mety musi być większy lub równy 1'],
        default: 1,
    },
    category_open: {
        exist: {
            type: Boolean,
            default: true,
        },
        number_of_position: {
            type: Number,
            default: 3,
            min: [1, 'Liczba pozycji musi być większa lub równa 1'],
        },
    },
    category_age: {
        exist: {
            type: Boolean,
            default: true,
        },
        number_of_position: {
            type: Number,
            default: 3,
            min: [1, 'Liczba pozycji musi być większa lub równa 1'],
        },
    },
    categories: [
        {
            type: String,
            trim: true,
        },
    ],
}, {
    timestamps: true,
});

ClassificationSchema.index({ event: 1, name: 1 }, { unique: true });

const Classification = mongoose.model('Classification', ClassificationSchema);

module.exports = Classification;
