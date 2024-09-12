const mongoose = require('mongoose');
const Counter = require('./Counter'); // Import licznika

const EventSchema = new mongoose.Schema({
    eventId: {
        type: Number,
        unique: true, // Upewnij się, że wartości są unikalne
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
}, {
    timestamps: true,
});

// Pre-save middleware for auto-incrementing `eventId`
EventSchema.pre('save', async function (next) {
    const event = this;

    // Jeśli `eventId` już istnieje, nie inkrementuj
    if (event.isNew) {
        try {
            // Znajdź licznik dla modelu 'Event'
            const counter = await Counter.findOneAndUpdate(
                { model: 'Event' },
                { $inc: { seq: 1 } }, // Inkrementacja licznika
                { new: true, upsert: true } // Utwórz dokument, jeśli nie istnieje
            );

            event.eventId = counter.seq; // Przypisz nową wartość eventId
        } catch (error) {
            return next(error);
        }
    }

    next();
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
