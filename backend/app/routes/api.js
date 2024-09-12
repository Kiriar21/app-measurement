const app = require('../app');
const express = require('express');
const router = express.Router();
const {createEvent, getEvents, deleteEvent, getEventByIdEdit, updateEventByIdEdit} = require('../controllers/EventController');

router.post('/events', createEvent);

router.get('/events', getEvents);
router.get('/event/:id/edit', getEventByIdEdit);
router.put('/event/:id/edit', updateEventByIdEdit);

router.delete('/events/:id', deleteEvent);


module.exports = router;