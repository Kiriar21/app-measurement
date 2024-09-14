const {mongoose, Schema} = require('mongoose');
const Statistic = require('./Statistic');

const ClassyficationSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
    },
    distance: {
        type: Number,
        trim: true,
    },
    type_of_event: {
        type: String,
        default: 'Bieg na czas',
        trim: true,
    },
    date_and_time: {
        type: Date,
        default: Date.now(),
    },
    impuls_number_start: {
        type: Number,
        default: 1,
    },
    impuls_number_finish: {
        type: Number,
        default: 1,
    },
    category_open: [
        { exist: Boolean, default: true }, 
        { number_of_position: Number, default: 3 }
    ],
    category_age: [
        { exist: Boolean, default: true }, 
        { number_of_position: Number, default: 3 }
    ],
    categories: {
        type: Array,
        default: [],  
    }
});

const Classyfication = mongoose.model('Classyfication', ClassyficationSchema);

module.exports = Classyfication;