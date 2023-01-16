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
        },
        applicationStatus : {
            type : String,
            required : true,
            default : 'Not Processed'
        },
        selectedApplicant : [
            {applicantId : String}
        ]
});

module.exports = mongoose.model(process.env.JOB_APPLIED_COLLECTION, jobAppliedSchema);