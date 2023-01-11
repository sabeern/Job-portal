const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/addPost', postController.addPost);
router.get('/employeePosts', postController.getEmployeePost);

module.exports = router;