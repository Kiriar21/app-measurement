const app = require('../app');
const express = require('express');
const router = express.Router();
const {createEvent, getEvents, deleteEvent} = require('../controllers/EventController');

router.post('/events', createEvent);
router.get('/events', getEvents);
router.delete('/events/:id', deleteEvent);

module.exports = router;