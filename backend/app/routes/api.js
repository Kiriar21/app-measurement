const app = require('../app');
const express = require('express');
const router = express.Router();


const {createEvent, getEvents, deleteEvent, getEventByIdEdit, updateEventByIdEdit, uploadCSVEvent, upload, multerErrorHandler, replaceCSVEvent, getEventStatistics} = require('../controllers/EventController');

router.post('/createEvent', createEvent);
router.post('/event/:id/updateDataCSV', upload.single('file'), uploadCSVEvent, multerErrorHandler);
router.post('/event/:id/replaceDataCSV', upload.single('file'), replaceCSVEvent, multerErrorHandler);

router.get('/event/:id/statistics', getEventStatistics);
router.get('/getEvents', getEvents);
router.get('/event/:id/edit', getEventByIdEdit);

router.put('/event/:id/edit', updateEventByIdEdit);

router.delete('/event/:id', deleteEvent);


module.exports = router;