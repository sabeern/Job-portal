const mongoose = require('mongoose');

const postShema = mongoose.Schema({
    postDescription: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    addedUser: {
        type: Object,
        required: true
    },
    addedDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    delFlag: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model(process.env.POST_COLLECTION, postShema);