const jobModel = require('../models/jobModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const appliedJobModel = require('../models/appliedJobModel');

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
        console.log('first22');
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
                        jobApplication.save();
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
        }
         if(searchResult) {
                res.status(200).send({searchResult});
         }else {
                res.status(401).send({msg:'Already available'});
         }
}

module.exports = { getEmployerJobs, getAllJobs, applyJob, checkJobStatus, findApplicantCount, searchJob };