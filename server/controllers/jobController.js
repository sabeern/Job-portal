const jobModel = require('../models/jobModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const appliedJobModel = require('../models/appliedJobModel');
const userModel = require('../models/userModel');
const postModel = require("../models/postModel");
const nodemailer = require('nodemailer');
const mailTemplate = require('../config/mailTemplate');
const reportJobModel = require('../models/reportJobModel');

const getEmployerJobs = async (req,res) => {
    let userId=false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if(userId) { 
                userId = mongoose.Types.ObjectId(userId);
                const employerJobs = await jobModel.aggregate([{$match:{postedUser:userId}},
                                    {$lookup:{from:process.env.USER_COLLECTION,localField:'postedUser',foreignField:'_id',as:'user'}},{$project:{'user.password':0}},{$unwind:'$user'}]);
                res.status(200).send({employerJobs});
        }else {
            res.status(401).send({errMsg:'Validation failed'});
        }
}
const getAllJobs = async (req,res) => {
        const allJobs = await jobModel.aggregate([{$match:{}},
                                {$lookup:{from:process.env.USER_COLLECTION,localField:'postedUser',foreignField:'_id',as:'user'}},{$project:{'user.password':0}},{$unwind:'$user'}]);
        res.status(200).send({allJobs});
}

const applyJob = async (req,res) => {
        let userId=false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if(userId) { 
                userId = mongoose.Types.ObjectId(userId);
                let {jobId} = req.body;
                jobId = mongoose.Types.ObjectId(jobId);
                const jobApplication = new appliedJobModel({
                        jobId, userId
                });
                try {
                        await jobApplication.save();
                        res.status(200).send({msg:'Applied for job successfully'});
                }catch(err) {
                        res.status(401).send({errMsg:'Failed operation, Try later'});
                }
        }else {
            res.status(401).send({errMsg:'Validation failed'});
        }
}

const checkJobStatus = async (req,res) => {
        let userId=false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if(userId) { 
                userId = mongoose.Types.ObjectId(userId);
                let {jobId} = req.body;
                jobId = mongoose.Types.ObjectId(jobId);
               let test = await appliedJobModel.findOne({$and:[{userId},{jobId}]});
               if(test) {
                res.status(200).send({msg:'Applied for this job'});
               }else {
                        res.status(401).send({errMsg:'Not applied yet'});
               }
        }else {
            res.status(401).send({errMsg:'Validation failed'});
        }
}
const findApplicantCount = async(req,res) => {
        let jobId  = req.params.jobId;
        jobId = mongoose.Types.ObjectId(jobId);
        const appCount = await appliedJobModel.find({jobId}).count();
        res.status(200).send({appCount});
}
const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER_MAIL,
          pass: process.env.SENDER_PASSWORD
        }
      });
const searchJob = async (req,res) => {
        const {jobTitle, jobLocation} = req.body;
        let searchResult;
        if(jobTitle && jobLocation) {
                searchResult = await jobModel.aggregate([{$match:{jobTitle:{ $regex:new RegExp('.*'+jobTitle+'.*','i') }}},
                {$lookup:{from:process.env.USER_COLLECTION,localField:'postedUser',foreignField:'_id',as:'user'}},
                {$match:{'user.companyLocation':{ $regex:new RegExp('.*'+jobLocation+'.*','i') }}},{$project:{'user.password':0}},{$unwind:'$user'}]);
        }else if(jobTitle) {
                searchResult = await jobModel.aggregate([{$match:{jobTitle:{ $regex:new RegExp('.*'+jobTitle+'.*','i') }}},
                {$lookup:{from:process.env.USER_COLLECTION,localField:'postedUser',foreignField:'_id',as:'user'}},
                {$project:{'user.password':0}},{$unwind:'$user'}]);
        }else if(jobLocation){
                searchResult = await jobModel.aggregate([{$lookup:{from:process.env.USER_COLLECTION,localField:'postedUser',foreignField:'_id',as:'user'}},
                {$match:{'user.companyLocation':{ $regex:new RegExp('.*'+jobLocation+'.*','i') }}},{$project:{'user.password':0}},{$unwind:'$user'}]);
        }else {
                searchResult = await jobModel.aggregate([{$match:{}},
                        {$lookup:{from:process.env.USER_COLLECTION,localField:'postedUser',foreignField:'_id',as:'user'}},{$project:{'user.password':0}},{$unwind:'$user'}]);
        }
         if(searchResult) {
                res.status(200).send({searchResult});
         }else {
                res.status(401).send({msg:'Already available'});
         }
}

const getJobApplications = async (req,res) => {
        let jobId = req.params.jobId;
        try {
                jobId = mongoose.Types.ObjectId(jobId);
        }catch(err) {
                res.status(401).send({errMsg:'Job not found'});
        }
        const applicant = await appliedJobModel.aggregate([{$match:{jobId}},{$lookup:{from:process.env.JOB_COLLECTION, localField:'jobId', foreignField:'_id', as:'job'}},
                                {$unwind:'$job'}, {$lookup:{from:process.env.USER_COLLECTION, localField:'userId', foreignField:'_id', as:'user'}}, {$unwind:'$user'},
                                        {$project:{'user.password':0}}]);
        if(applicant) {
                res.status(200).send({applicant});
        }else   {
                res.status(401).send({errMsg:'Job not found'});
        }                
}
const getEmpProfileAndPost = async (req,res) => {
        let empId = req.params.empId;
        try {
                empId = mongoose.Types.ObjectId(empId);
        }catch(err) {
                res.status(401).send({errMsg:'Employee not found'});
        }
        const empProfile = await userModel.findById(empId);
        const employeePosts = await postModel.find({addedUser:empId});
        if(empProfile) {
                empProfile.password = '';
                res.status(200).send({empProfile, employeePosts});
        }else {
                res.status(401).send({errMsg:'Employee not found'});
        }
}
const getJobDetails = async (req,res) => {
        const jobId = req.params.jobId;
        const jobDetails = await jobModel.findById(jobId);
        res.status(200).send({jobDetails});
}

const getJobStatus = async (req,res) => {
        let data = req.params.jobData;
        data = data.split('-');
        let [jobId,empId] = data;
        try {
                jobId = mongoose.Types.ObjectId(jobId);
                empId = mongoose.Types.ObjectId(empId);
        }catch(err) {
                console.log(err.message);
        }
        const jobDetails = await appliedJobModel.findOne({jobId,userId:empId},{applicationStatus:1, tagStatus:1});
        res.status(200).send({jobDetails});
}
const updateJobAppStatus = async (req,res) => {
        let {status,applicationId, jobId, email, name} = req.body;
        applicationId = mongoose.Types.ObjectId(applicationId);
        const userEmail = 'nsabeer007@gmail.com';
        const jobDetails = await jobModel.aggregate([{$match:{jobId}},{$lookup:{from:process.env.USER_COLLECTION, localField:'postedUser', foreignField:'_id', as:'user'}},{$unwind:'$user'}]);
        const mailData = mailTemplate.statusMail(name, jobDetails[0],status);
        const mailOptions = {
                from: process.env.SENDER_MAIL,
                to: userEmail,
                subject: 'Job solutions application response',
                html: mailData
              }
                transporter.sendMail(mailOptions, async function(error, info){
                  if (error) {
                    res.status(401).send({errMsg:'Mail sending failed'});
                  } else {
                        await appliedJobModel.findByIdAndUpdate(applicationId, {applicationStatus:status});
                        res.status(200).send({msg:'Mail send to employee'});
                  } });
}

const tagJob = async (req,res) => {
        let {jobId,empId} = req.body;
        jobId = mongoose.Types.ObjectId(jobId);
        newEmpId = mongoose.Types.ObjectId(empId);
        try {
                await appliedJobModel.findOneAndUpdate({jobId,userId:newEmpId},{$push:{selectedApplicant:empId},tagStatus:1});
                res.status(200).send({msg:'Job tagged'});
        }catch(err) {
                console.log('Already taged');
        }
}

const reportJob = async (req,res) => {
        let { jobIssue, jobId, userId } = req.body;
        jobId = mongoose.Types.ObjectId(jobId);
        userId = mongoose.Types.ObjectId(userId);
        const jobReport = new reportJobModel({
                issue:jobIssue, jobId, issuedUser:userId
        });
        try {
                await jobReport.save();
                res.status(200).send({msg:'Successfully posted'});
        }catch(err) {
                res.status(401).send({errMsg:'Failed posting issue'});
        }
}

module.exports = { getEmployerJobs, getAllJobs, applyJob, checkJobStatus, findApplicantCount, searchJob, getJobApplications, getEmpProfileAndPost, getJobDetails, getJobStatus, updateJobAppStatus, tagJob, reportJob };