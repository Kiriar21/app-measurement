const {mongoose, Schema} = require('mongoose');
const Classyfication = require('./Classyfication');
const User = require('./User');

const EventSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: '',
    },
    localization:{
        type: String,
        required: true,
        trim: true,
        default: '',
    },
    date:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    classyfications:[{
        type: Schema.Types.ObjectId,
        ref: Classyfication,
    }],
    users:[{
        type: Schema.Types.ObjectId,
        ref: User,
    }],
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event; 