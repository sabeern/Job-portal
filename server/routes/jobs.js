const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const tokenValidation = require('../config/tokenValidation');

router.get('/employerJobs', tokenValidation.validateToken, jobController.getEmployerJobs);
router.get('/allJobs', tokenValidation.validateToken, jobController.getAllJobs);
router.post('/applyJob', tokenValidation.validateToken, jobController.applyJob);
router.post('/applyStatus', tokenValidation.validateToken, jobController.checkJobStatus);
router.get('/applicantCount/:jobId', jobController.findApplicantCount);
router.post('/searchJob', jobController.searchJob);
router.get('/jobApplications/:jobId', jobController.getJobApplications);
router.get('/empDetails/:empId', jobController.getEmpProfileAndPost);
router.get('/getJobDetails/:jobId', jobController.getJobDetails);
router.get('/getJobApplication/:jobData', tokenValidation.validateToken, jobController.getJobStatus);
router.put('/updateStatus', tokenValidation.validateToken, jobController.updateJobAppStatus);
router.put('/tagJob', tokenValidation.validateToken, jobController.tagJob);
router.post('/reportIssue', tokenValidation.validateToken, jobController.reportJob);
router.delete('/deleteJob/:jobId', tokenValidation.validateToken, jobController.deleteJob);
router.get('/getTagedUser/:jobId', tokenValidation.validateToken, jobController.getTagedUser);
router.get('/notification/:id', tokenValidation.validateToken, jobController.getNotification);
router.get('/notificationCount/:id', tokenValidation.validateToken, jobController.notificationCount);

module.exports = router;