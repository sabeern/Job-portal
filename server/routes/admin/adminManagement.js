const express = require('express');
const router = express.Router();
const adminManagementController = require('../../controllers/admin/adminManagementController');

router.get('/jobs', adminManagementController.getJobIssues);
router.put('/blockJob', adminManagementController.blockJob);

module.exports = router;
