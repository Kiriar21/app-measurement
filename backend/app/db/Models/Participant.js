const {mongoose, Schema} = require('mongoose');

const UserSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    chip_number: {
        type: Number,
        required: true,
    },
    classyfication: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    competitor: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: '',
    },
    club: {
        type: String,
        default: '',
    },
    tel: {
        type: String,
        default: '',
    },
    //REST 
    status: {
        type: String,
        enum: ['DNF', 'DNS', 'DNQ', 'START'],
        default: 'START',
    },
    finished: {
        type: Boolean,
        default: false,
    },
    time_start: {
        type: Array,
        default: [],
    }, 
    time_end: {
        type: Array,
        default: [],
    },
    time_netto: {
        type: Date,
    },
    time_brutto: {
        type: Date,
    },
    time_avg: {
        type: Date,
    },
    diff_time: {
        type: Date,
    },
    place: {
        type: Number,
    },
    place_gender: {
        type: Number,
    },
    place_age: {
        type: Number,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;