const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    jobId : {
        type : Number,
        required : true
    },
    jobTitle : {
        type : String,
        required : true
    },
    salaryRange : {
        type : String,
        required : true
    },
    requiredSkills : {
        type : String,
        required : true
    },
    moreDetails : {
        type : String,
        required : true
    },
    postedUser : {
        type : Object,
        required : true
    },
    postedDate : {
        type : Date,
        required : true,
        default : Date.now()
    },
    listingStatus : {
        type : Boolean,
        require : true,
        default : true
    },
    delFlag : {
        type : Number,
        required : true,
        default : 0
    }
});

module.exports = mongoose.model(process.env.JOB_COLLECTION, jobSchema);