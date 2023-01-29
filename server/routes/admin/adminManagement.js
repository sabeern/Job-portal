const express = require('express');
const router = express.Router();
const adminManagementController = require('../../controllers/admin/adminManagementController');
const tokenValidation = require('../../config/tokenValidation');

router.get('/jobs', tokenValidation.adminValidateToken, adminManagementController.getJobIssues);
router.put('/blockJob', tokenValidation.adminValidateToken, adminManagementController.blockJob);
router.get('/getDetails', tokenValidation.adminValidateToken, adminManagementController.getDetails);
router.get('/getEmployeeDetails', tokenValidation.adminValidateToken, tokenValidation.adminValidateToken, adminManagementController.employeeDetails);
router.get('/getEmployerDetails', tokenValidation.adminValidateToken, adminManagementController.employerDetails);
router.put('/blockUnblockUser', tokenValidation.adminValidateToken, adminManagementController.blockUnblockUser);

module.exports = router;
