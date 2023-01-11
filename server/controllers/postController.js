const postModel = require('../models/postModel');

const addPost = async (req,res) => {
    const {postDescription, postImage} = req.body;
    const newPost = new postModel({
        postDescription, postImage
    });
    try {
        await newPost.save();
        res.status(200).send({msg: 'New post added'});
    }catch(err) {
        res.status(401).send({errMsg:'Post adding failed'});
    }
}

module.exports = { addPost };