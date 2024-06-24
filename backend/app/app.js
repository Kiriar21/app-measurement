const express = require('express');
const app = express()

const session = require('express-session');
const {sessionKeySecret} = require('./config');
const helmet = require('helmet'); 
const rareLimiter = require('../app/middleware/rare-limiter-middleware');

require('../db/mongoose_local')
require('../db/mongoose_online')

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'" , "cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'" , "cdn.jsdelivr.net"]
        }
    }
}))

app.use(session({
    // secret: sessionKeySecret - comment, because in opinion programmers -  more carefully is holding secret key in code not in .env ... 
    secret: '5n324nfnofn3ir34ni5n345n3i5n3n5i3n54i34ni3nsifneuinferign34i353453fnewvnenviregn4eign4ir4n3i5n3fi3n3ini3vinigvri3rtin35ni345invinvfivfiredngireni345i34n534i53ni543i54ni3n5n324nfnofn3ir34ni5n345n3i45n3n5i3n54i34ni3nvwsdvnih324i234i2n423in4i2n43i2n34i`', 
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
}))

app.use(rareLimiter)

module.exports = app;