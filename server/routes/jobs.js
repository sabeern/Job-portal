const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const tokenValidation = require('../config/tokenValidation');

router.get('/employerJobs', tokenValidation.validateToken, jobController.getEmployerJobs);
router.get('/allJobs', jobController.getAllJobs);
router.post('/applyJob', jobController.applyJob);
router.post('/applyStatus', jobController.checkJobStatus);

module.exports = router;