const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const rareLimiter = require('../app/middleware/rare-limiter-middleware');
const { sessionKeySecret } = require('./config');
const localDB = require('./db/mongoose_connection');
const eventsRoutes = require('./routes/api'); // Import tras z API

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pozwala na parsowanie JSON w request body
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"]
        }
    }
}));

app.use(session({
    secret: sessionKeySecret,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 dzień
    resave: false,
}));

app.use(rareLimiter);

// Rejestracja tras
app.use('/api', eventsRoutes); // Użycie tras pod ścieżką /api

module.exports = app;