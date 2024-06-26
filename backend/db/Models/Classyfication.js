const {mongoose, Schema} = require('mongoose');

const ClassyficationSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
    },
    distance: {
        type: String,
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
    },
    statistics: [{
        type: Schema.Types.ObjectId,
        ref: 'Statistic',
    }]
});

const Classyfication = mongoose.model('Classyfication', ClassyficationSchema);

module.exports = Classyfication;