const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');

router.post('/bookings', controller.bookTicket);
router.get('/bookings/:userNumber', controller.getUserBookings);

module.exports = router;
