const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    addedTime: {
        type: Date,
        required: true,
        default: new Date()
    },
    jobId:{
        type:String
    },
    readStatus: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model(process.env.NOTIFICATION_COLLECTION, notificationSchema);
