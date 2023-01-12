const mongoose = require('mongoose');

const jobAppliedSchema = mongoose.Schema({
        jobId : {
            type : Object,
            required : true
        },
        userId : {
            type : Object,
            required : true
        },
        appliedDate : {
            type : Date,
            required : true,
            default : new Date()
        }
});

module.exports = mongoose.model(process.env.JOB_APPLIED_COLLECTION, jobAppliedSchema);