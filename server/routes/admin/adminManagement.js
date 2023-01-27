const express = require('express');
const router = express.Router();
const adminManagementController = require('../../controllers/admin/adminManagementController');

router.get('/jobs', adminManagementController.getJobIssues);
router.put('/blockJob', adminManagementController.blockJob);
router.get('/getDetails', adminManagementController.getDetails);
router.get('/getEmployeeDetails', adminManagementController.employeeDetails);
router.get('/getEmployerDetails', adminManagementController.employerDetails);
router.put('/blockUnblockUser', adminManagementController.blockUnblockUser);

module.exports = router;
