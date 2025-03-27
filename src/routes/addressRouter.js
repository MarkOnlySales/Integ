const express = require('express');
const addressController = require('../controllers/addressController');


const router = express.Router();

router.post("/", addressController.createAddress)

module.exports = router;