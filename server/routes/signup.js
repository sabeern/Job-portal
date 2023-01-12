const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.post('/', signupController.userExistCheck, signupController.signup);
router.post('/validateOtp', signupController.validateOtp);
router.post('/restPassword', signupController.forgotSendOtp);
router.post('/validateResetOtp', signupController.resetOtpValidate);
router.post('/updatePassword', signupController.updatePassword);

module.exports = router;