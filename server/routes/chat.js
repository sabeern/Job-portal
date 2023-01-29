const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const tokenValidation = require('../config/tokenValidation');

router.post('/', tokenValidation.validateToken, chatController.createChat);
router.get('/user/:userId', tokenValidation.validateToken, chatController.getUser);
router.get('/:userId', tokenValidation.validateToken, chatController.userChats);
router.get('/find/:firstId/:secondId', tokenValidation.validateToken, chatController.findChat);

module.exports = router;