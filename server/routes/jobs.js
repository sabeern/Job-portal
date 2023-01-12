const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const tokenValidation = require('../config/tokenValidation');

router.get('/employerJobs', tokenValidation.validateToken, jobController.getEmployerJobs);
router.get('/allJobs', tokenValidation.validateToken, jobController.getAllJobs);
router.post('/applyJob', tokenValidation.validateToken, jobController.applyJob);
router.post('/applyStatus', tokenValidation.validateToken, jobController.checkJobStatus);
router.get('/applicantCount/:jobId', jobController.findApplicantCount);

module.exports = router;