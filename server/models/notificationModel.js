const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    addedTime:{
        type: Date,
        required: true,
        default: new Date()
    },
    readStatus:{
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model(process.env.NOTIFICATION_COLLECTION, notificationSchema);
