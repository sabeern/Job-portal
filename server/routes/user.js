const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenValidation = require('../config/tokenValidation');

router.get('/', tokenValidation.validateToken ,userController.getUserDetails);

module.exports = router;