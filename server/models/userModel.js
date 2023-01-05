const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    firstName : String,
    lastName : String,
    jobTitle : String,
    qualification : String,
    experience : String,
    details : String,
    contactNumber : String,
    companyName : String,
    location : String,
    profileImage : String,
    registeredDate : {
        type : Date,
        required : true,
        default : Date.now()
    },
    delFlag : {
        type : Number,
        required : true,
        default : 0
    }
})

module.exports = mongoose.model(process.env.USER_COLLECTION,userShema);