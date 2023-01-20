const { boolean } = require('joi');
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
        selectedApplicant : {
            type : Array
        },
        tagStatus : {
            type : Boolean,
            default : 0,
            required : true
        }
});

module.exports = mongoose.model(process.env.JOB_APPLIED_COLLECTION, jobAppliedSchema);