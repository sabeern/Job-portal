const jobModel = require('../models/jobModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const appliedJobModel = require('../models/appliedJobModel');
const userModel = require('../models/userModel');
const postModel = require("../models/postModel");
const nodemailer = require('nodemailer');
const mailTemplate = require('../config/mailTemplate');
const reportJobModel = require('../models/reportJobModel');
//Get the all posted jobs of selected employer
const getEmployerJobs = async (req, res) => {
        let userId = false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if (userId) {
                userId = mongoose.Types.ObjectId(userId);
                const employerJobs = await jobModel.aggregate([{ $match: { postedUser: userId, delFlag: 0 } },
                { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' },
                { $sort: { postedDate: -1 } }]);
                res.status(200).send({ employerJobs });
        } else {
                res.status(401).send({ errMsg: 'Validation failed' });
        }
}
//Get all non deleted and unblocked jobs for employee
const getAllJobs = async (req, res) => {
        const allJobs = await jobModel.aggregate([{ $match: { delFlag: 0, listingStatus: true } },
        { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' }
                , { $sort: { postedDate: -1 } }]);
        res.status(200).send({ allJobs });
}
//Inserting details of job applied person
const applyJob = async (req, res) => {
        let userId = false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if (userId) {
                userId = mongoose.Types.ObjectId(userId);
                let { jobId } = req.body;
                jobId = mongoose.Types.ObjectId(jobId);
                const jobApplication = new appliedJobModel({
                        jobId, userId
                });
                try {
                        await jobApplication.save();
                        res.status(200).send({ msg: 'Applied for job successfully' });
                } catch (err) {
                        res.status(401).send({ errMsg: 'Failed operation, Try later' });
                }
        } else {
                res.status(401).send({ errMsg: 'Validation failed' });
        }
}
//Checking the tag status of jobs
const checkJobStatus = async (req, res) => {
        let userId = false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if (userId) {
                userId = mongoose.Types.ObjectId(userId);
                let { jobId } = req.body;
                jobId = mongoose.Types.ObjectId(jobId);
                let test = await appliedJobModel.findOne({ $and: [{ userId }, { jobId }] });
                if (test) {
                        res.status(200).send({ msg: 'Applied for this job' });
                } else {
                        res.status(401).send({ errMsg: 'Not applied yet' });
                }
        } else {
                res.status(401).send({ errMsg: 'Validation failed' });
        }
}
//Finding applied employees count for each job
const findApplicantCount = async (req, res) => {
        let jobId = req.params.jobId;
        jobId = mongoose.Types.ObjectId(jobId);
        const appCount = await appliedJobModel.find({ jobId }).count();
        res.status(200).send({ appCount });
}
const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: process.env.SENDER_MAIL,
                pass: process.env.SENDER_PASSWORD
        }
});
//Searching jobs with job title and company location
const searchJob = async (req, res) => {
        const { jobTitle, jobLocation } = req.body;
        let searchResult;
        if (jobTitle && jobLocation) {
                searchResult = await jobModel.aggregate([{ $match: { jobTitle: { $regex: new RegExp('.*' + jobTitle + '.*', 'i') }, delFlag: 0, listingStatus: true } },
                { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } },
                { $match: { 'user.companyLocation': { $regex: new RegExp('.*' + jobLocation + '.*', 'i') } } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' }
                        , { $sort: { postedDate: -1 } }]);
        } else if (jobTitle) {
                searchResult = await jobModel.aggregate([{ $match: { jobTitle: { $regex: new RegExp('.*' + jobTitle + '.*', 'i') }, delFlag: 0, listingStatus: true } },
                { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } },
                { $project: { 'user.password': 0 } }, { $unwind: '$user' }, { $sort: { postedDate: -1 } }]);
        } else if (jobLocation) {
                searchResult = await jobModel.aggregate([{ $match: { delFlag: 0, listingStatus: true } }, { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } },
                { $match: { 'user.companyLocation': { $regex: new RegExp('.*' + jobLocation + '.*', 'i') } } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' },
                { $sort: { postedDate: -1 } }]);
        } else {
                searchResult = await jobModel.aggregate([{ $match: { delFlag: 0, listingStatus: true } },
                { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' },
                { $sort: { postedDate: -1 } }]);
        }
        if (searchResult) {
                res.status(200).send({ searchResult });
        } else {
                res.status(401).send({ msg: 'Already available' });
        }
}
//Get all applicat details for selected job
const getJobApplications = async (req, res) => {
        let jobId = req.params.jobId;
        try {
                jobId = mongoose.Types.ObjectId(jobId);
        } catch (err) {
                res.status(401).send({ errMsg: 'Job not found' });
        }
        const applicant = await appliedJobModel.aggregate([{ $match: { jobId } }, { $lookup: { from: process.env.JOB_COLLECTION, localField: 'jobId', foreignField: '_id', as: 'job' } },
        { $unwind: '$job' }, { $lookup: { from: process.env.USER_COLLECTION, localField: 'userId', foreignField: '_id', as: 'user' } }, { $unwind: '$user' },
        { $project: { 'user.password': 0 } }]);
        if (applicant) {
                res.status(200).send({ applicant });
        } else {
                res.status(401).send({ errMsg: 'Job not found' });
        }
}
//Taking all profile datails and post of employee for checking to employer
const getEmpProfileAndPost = async (req, res) => {
        let empId = req.params.empId;
        try {
                empId = mongoose.Types.ObjectId(empId);
        } catch (err) {
                res.status(401).send({ errMsg: 'Employee not found' });
        }
        const empProfile = await userModel.findById(empId);
        const employeePosts = await postModel.find({ addedUser: empId, delFlag: 0 }).sort({ addedDate: -1 });
        if (empProfile) {
                empProfile.password = '';
                res.status(200).send({ empProfile, employeePosts });
        } else {
                res.status(401).send({ errMsg: 'Employee not found' });
        }
}
//Fetching all details of specific job
const getJobDetails = async (req, res) => {
        const jobId = req.params.jobId;
        const jobDetails = await jobModel.findById(jobId);
        res.status(200).send({ jobDetails });
}
//Taking the current status and tag status of selected job
const getJobStatus = async (req, res) => {
        let data = req.params.jobData;
        data = data.split('-');
        let [jobId, empId] = data;
        try {
                jobId = mongoose.Types.ObjectId(jobId);
                empId = mongoose.Types.ObjectId(empId);
        } catch (err) {
                res.status(401).send(err.message);
        }
        const jobDetails = await appliedJobModel.findOne({ jobId, userId: empId }, { applicationStatus: 1, tagStatus: 1 });
        res.status(200).send({ jobDetails });
}
//Selecting employees and sending response mail to employees
const updateJobAppStatus = async (req, res) => {
        let { status, applicationId, jobId, email, name } = req.body;
        applicationId = mongoose.Types.ObjectId(applicationId);
        const userEmail = 'nsabeer007@gmail.com';
        const jobDetails = await jobModel.aggregate([{ $match: { jobId } }, { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }]);
        const mailData = mailTemplate.statusMail(name, jobDetails[0], status);
        const mailOptions = {
                from: process.env.SENDER_MAIL,
                to: userEmail,
                subject: 'Job solutions application response',
                html: mailData
        }
        transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                        res.status(401).send({ errMsg: 'Mail sending failed' });
                } else {
                        await appliedJobModel.findByIdAndUpdate(applicationId, { applicationStatus: status });
                        res.status(200).send({ msg: 'Mail send to employee' });
                }
        });
}
//Tagging job with chat
const tagJob = async (req, res) => {
        let { jobId, empId } = req.body;
        jobId = mongoose.Types.ObjectId(jobId);
        newEmpId = mongoose.Types.ObjectId(empId);
        try {
                await appliedJobModel.findOneAndUpdate({ jobId, userId: newEmpId }, { $push: { selectedApplicant: empId }, tagStatus: 1 });
                await jobModel.findByIdAndUpdate(jobId, { $push: { selectedApplicant: empId } });
                res.status(200).send({ msg: 'Job tagged' });
        } catch (err) {
                res.status(401).send('Already taged');
        }
}
//Employee reporting issues about selected job
const reportJob = async (req, res) => {
        let { jobIssue, jobId, userId } = req.body;
        jobId = mongoose.Types.ObjectId(jobId);
        userId = mongoose.Types.ObjectId(userId);
        const jobReport = new reportJobModel({
                issue: jobIssue, jobId, issuedUser: userId
        });
        try {
                await jobReport.save();
                res.status(200).send({ msg: 'Successfully posted' });
        } catch (err) {
                res.status(401).send({ errMsg: 'Failed posting issue' });
        }
}
//Deleting unwanted jobs
const deleteJob = async (req, res) => {
        let jobId = req.params.jobId;
        jobId = mongoose.Types.ObjectId(jobId);
        await jobModel.findByIdAndUpdate(jobId, { delFlag: 1 });
        res.status(200).send({ msg: 'Job deleted successfully' });
}
//Searching all tagged users of specific jobs
const getTagedUser = async (req, res) => {
        const jobId = req.params.jobId;
        const tagedUsers = await jobModel.findOne({ jobId });
        if (tagedUsers) {
                res.status(200).send({ tagedUsers });
        } else {
                res.status(401).send({ errMsg: 'No details found' });
        }
}

module.exports = {
        getEmployerJobs, getAllJobs, applyJob, checkJobStatus, findApplicantCount,
        searchJob, getJobApplications, getEmpProfileAndPost, getJobDetails, getJobStatus, updateJobAppStatus, tagJob, reportJob, deleteJob, getTagedUser
};