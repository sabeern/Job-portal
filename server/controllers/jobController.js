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

module.exports = { getEmployerJobs, getAllJobs, applyJob, checkJobStatus };