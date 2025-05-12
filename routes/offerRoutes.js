const express = require('express');
const router = express.Router();
const controller = require('../controllers/offerController');

router.get('/offers', controller.getOffers);

module.exports = router;
