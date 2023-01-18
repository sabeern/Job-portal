const express = require('express');
const router = express.Router();
const adminLoginController = require('../../controllers/admin/adminLoginController');

router.post('/', adminLoginController.login);

module.exports = router;