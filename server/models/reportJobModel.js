const mongoose = require('mongoose');

const jobReportSchema = mongoose.Schema({
    issue : {
        type : String,
        required : true
    },
    jobId : {
        type : Object,
        required : true
    },
    issuedUser : {
        type : Object,
        required : true
    },
    issuedDate : {
        type : Date,
        required : true,
        default : new Date()
    }
});

module.exports = mongoose.model(process.env.JOB_REPORT_SCHEMA, jobReportSchema);