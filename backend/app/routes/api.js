const app = require('../app');
const express = require('express');
const router = express.Router();


const {createEvent, getEvents, deleteEvent, getEventByIdEdit, updateEventByIdEdit, uploadCSVEvent, upload, multerErrorHandler, replaceCSVEvent, getEventStatistics, getUsers, getUser, editUser, deleteUser} = require('../controllers/EventController');

router.post('/createEvent', createEvent);
router.post('/event/:id/updateDataCSV', upload.single('file'), uploadCSVEvent, multerErrorHandler);
router.post('/event/:id/replaceDataCSV', upload.single('file'), replaceCSVEvent, multerErrorHandler);

router.get('/event/:id/statistics', getEventStatistics);
router.get('/getEvents', getEvents);
router.get('/event/:id/edit', getEventByIdEdit);
router.get('/event/:id/getUsers', getUsers);
router.get('/event/:id/getUser/:number', getUser);


router.put('/event/:id/editUser/:number', editUser);
router.put('/event/:id/edit', updateEventByIdEdit);

router.delete('/event/:id', deleteEvent);
router.delete('/event/:id/deleteUser/:number', deleteUser);


module.exports = router;