const postModel = require('../models/postModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const addPost = async (req,res) => {
    let userId=false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if(userId) { 
            const {postDescription, postImage} = req.body;
            const newUserId = mongoose.Types.ObjectId(userId);
            const newPost = new postModel({
                postDescription, postImage, addedUser:newUserId
            });
            try {
                await newPost.save();
                res.status(200).send({msg: 'New post added'});
            }catch(err) {
                res.status(401).send({errMsg:'Post adding failed'});
            }
        }else {
            res.status(401).send({errMsg:'Validation failed'});
        }
}
const getEmployeePost = async (req,res) => {
        let userId=false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if(userId) { 
                userId = mongoose.Types.ObjectId(userId);
                const employeePosts = await postModel.find({addedUser:userId});
                res.status(200).send({employeePosts});
        }else {
            res.status(401).send({errMsg:'Validation failed'});
        }
}

module.exports = { addPost, getEmployeePost };