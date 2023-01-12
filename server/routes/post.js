const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const tokenValidation = require('../config/tokenValidation');

router.post('/addPost', tokenValidation.validateToken, postController.addPost);
router.get('/employeePosts', tokenValidation.validateToken, postController.getEmployeePost);

module.exports = router;