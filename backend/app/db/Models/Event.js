const mongoose = require('mongoose');
const Counter = require('./Counter');
const ClassificationSchema = require('./Classification');

const EventSchema = new mongoose.Schema({
    eventId: {
        type: Number,
        unique: true, 
    },
    name: {
        type: String,
        required: [true, 'Nazwa wydarzenia jest wymagana'],
        trim: true,
        minlength: [3, 'Nazwa wydarzenia musi mieć co najmniej 3 znaki'],
        default: 'Nazwa wydarzenia',
    },
    localization: {
        type: String,
        required: [true, 'Lokalizacja jest wymagana'],
        trim: true,
        minlength: [3, 'Nazwa lokalizacji musi mieć co najmniej 3 znaki'],
        default: '',
    },
    date: {
        type: Date,
        required: [true, 'Data wydarzenia jest wymagana'],
        default: Date.now,
    },
    classifications: [ClassificationSchema],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

EventSchema.virtual('participants', {
    ref: 'Participant',
    localField: '_id',
    foreignField: 'event',
    justOne: false,
});

EventSchema.pre('save', async function (next) {
    const event = this;

    if (event.isNew) {
        try {
            const counter = await Counter.findOneAndUpdate(
                { model: 'Event' },
                { $inc: { seq: 1 } }, 
                { new: true, upsert: true }
            );

            event.eventId = counter.seq; 
        } catch (error) {
            return next(error);
        }
    }

    next();
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
