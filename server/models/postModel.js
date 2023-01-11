const mongoose = require('mongoose');

const postShema = mongoose.Schema({
    postDescription: {
        type:String,
        required:true
    },
    postImage: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model(process.env.POST_COLLECTION, postShema);