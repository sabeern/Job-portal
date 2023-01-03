const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.post('/', signupController.userExistCheck, signupController.signup);
router.post('/validateOtp', signupController.validateOtp);

module.exports = router;