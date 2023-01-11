const mongoose = require('mongoose');

const postShema = mongoose.Schema({
    postDescription: {
        type:String,
        required:true
    },
    postImage: {
        type:String,
        required:true
    },
    addedUser: {
        type : Object,
        required : true
    },
    addedDate: {
        type : Date,
        required : true,
        default : new Date()
    }
});

module.exports = mongoose.model(process.env.POST_COLLECTION, postShema);