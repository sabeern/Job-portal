const postModel = require('../models/postModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//Adding new posts employee
const addPost = async (req, res) => {
    let userId = false;
    let token = req.headers['x-custom-header'];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    userId = decode.loginedUser.id;
    if (userId) {
        const { postDescription, postImage } = req.body;
        let newUserId;
        try {
            newUserId = mongoose.Types.ObjectId(userId);
        } catch (err) {
            res.status(401).send({ errMsg: 'Data not found' });
            return;
        }
        const newPost = new postModel({
            postDescription, postImage, addedUser: newUserId
        });
        try {
            await newPost.save();
            res.status(200).send({ msg: 'New post added' });
        } catch (err) {
            res.status(401).send({ errMsg: 'Post adding failed' });
        }
    } else {
        res.status(401).send({ errMsg: 'Validation failed' });
    }
}
//Fetching all posts of employee
const getEmployeePost = async (req, res) => {
    let userId = false;
    let token = req.headers['x-custom-header'];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    userId = decode.loginedUser.id;
    if (userId) {
        try {
            userId = mongoose.Types.ObjectId(userId);
            const employeePosts = await postModel.find({ addedUser: userId, delFlag: 0 }).sort({ addedDate: -1 });
            res.status(200).send({ employeePosts });
        } catch (err) {
            res.status(500).send({ errMsg: 'Internals server error' });
            return;
        }
    } else {
        res.status(401).send({ errMsg: 'Validation failed' });
    }
}
//Delete selected post of employee
const deletePost = async (req, res) => {
    try {
        let postId = req.params.postId;
        try {
            postId = mongoose.Types.ObjectId(postId);
        } catch (err) {
            res.status(401).send({ errMsg: 'Data not found' });
            return;
        }
        await postModel.findByIdAndUpdate(postId, { delFlag: 1 });
        res.status(200).send({ msg: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).send({ errMsg: 'Internal server error' });
    }
}

module.exports = { addPost, getEmployeePost, deletePost };