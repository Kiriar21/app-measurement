const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassificationSchema = new Schema({
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
        type: String,
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
    input_file_start: {
        type: String,
        default: '',
    },
    input_file_meta: {
        type: String,
        default: '',
    },
    file_start_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FileMeasurement',
    },
    file_meta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FileMeasurement',
    },
    category_open: {
        exist: {
            type: Boolean,
            default: true,
        },
        number_of_position: {
            type: Number,
            default: 3,
            min: [0, 'Liczba pozycji musi być większa lub równa 0'],
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
            min: [0, 'Liczba pozycji musi być większa lub równa 0'],
        },
    },
    categories: [
        {
            type: String,
            trim: true,
        },
    ],
    statistics: {
        finish: {
            total: { type: Number, default: 0 },
            females: { type: Number, default: 0 },
            males: { type: Number, default: 0 },
        },
        non_finish: {
            total: { type: Number, default: 0 },
            females: { type: Number, default: 0 },
            males: { type: Number, default: 0 },
        },
        total: {
            total: { type: Number, default: 0 },
            females: { type: Number, default: 0 },
            males: { type: Number, default: 0 },
        },
    },
}, {
    timestamps: true,
});

module.exports = ClassificationSchema;
