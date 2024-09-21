const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const rareLimiter = require('../app/middleware/rare-limiter-middleware');
const { sessionKeySecret } = require('./config');
const localDB = require('./db/mongoose_connection');
const eventsRoutes = require('./routes/api'); 

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
  };

app.use(cors(corsOptions));
app.use(express.json()); 
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
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, 
    resave: false,
}));

app.use(rareLimiter);


app.use('/api', eventsRoutes); 

module.exports = app;