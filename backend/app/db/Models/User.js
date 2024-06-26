const {mongoose, Schema} = require('mongoose');

const UserSchema = new Schema({
    number: {
        type: Number,
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
    },
    club: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: 'Udział',
    },
    location: {
        type: String,
    },
    classyfication: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
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