const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const tokenValidation = require('../config/tokenValidation');

router.get('/employerJobs', tokenValidation.validateToken, jobController.getEmployerJobs);

module.exports = router;