const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenValidation = require('../config/tokenValidation');

router.get('/', tokenValidation.validateToken, userController.getUserDetails);
router.post('/postJob', tokenValidation.validateToken, userController.postJob);
router.post('/addCompanyDetails', tokenValidation.validateToken, userController.updateCompanyDetails);
router.post('/addEmployeeDetails', userController.updateEmployeeDetails);

module.exports = router;