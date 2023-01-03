const mongoose = require('mongoose');

const otpShema = mongoose.Schema({
        userEmail:{
            type : String,
            required : true
        },
        userOtp : {
            type : String,
            requied : true
        },
        otpExpiry : {
            type : Date,
            required :true
        }
});

module.exports = mongoose.model(process.env.OTP_COLLECTION, otpShema);