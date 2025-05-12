const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticketController');

router.get('/tickets', controller.getAllTickets);
router.get('/tickets/search', controller.searchTickets);

module.exports = router;
