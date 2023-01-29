const jobModel = require('../models/jobModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const appliedJobModel = require('../models/appliedJobModel');
const userModel = require('../models/userModel');
const postModel = require("../models/postModel");
const nodemailer = require('nodemailer');
const mailTemplate = require('../config/mailTemplate');
const reportJobModel = require('../models/reportJobModel');
const notificationModel = require('../models/notificationModel');
//Get the all posted jobs of selected employer
const getEmployerJobs = async (req, res) => {
        let userId = false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if (userId) {
                try {
                        userId = mongoose.Types.ObjectId(userId);
                } catch (err) {
                        res.status(401).send({ errMsg: 'Data not found' });
                        return;
                }
                try {
                        const employerJobs = await jobModel.aggregate([{ $match: { postedUser: userId, delFlag: 0 } },
                        { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' },
                        { $sort: { postedDate: -1 } }]);
                        res.status(200).send({ employerJobs });
                } catch (err) {
                        res.status(500).send({ errMsg: 'Internal server error' });
                        return;
                }
        } else {
                res.status(401).send({ errMsg: 'Validation failed' });
        }
}
//Get all non deleted and unblocked jobs for employee
const getAllJobs = async (req, res) => {
        try {
                const allJobs = await jobModel.aggregate([{ $match: { delFlag: 0, listingStatus: true } },
                { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' }
                        , { $sort: { postedDate: -1 } }]);
                res.status(200).send({ allJobs });
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
        }

}
//Inserting details of job applied person
const applyJob = async (req, res) => {
        let userId = false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if (userId) {
                let { jobId } = req.body;
                let notificationJobId = jobId;
                try {
                        userId = mongoose.Types.ObjectId(userId);
                        jobId = mongoose.Types.ObjectId(jobId);
                } catch (err) {
                        res.status(401).send({ errMsg: 'Data not found' });
                        return;
                }

                const jobApplication = new appliedJobModel({
                        jobId, userId
                });
                try {
                        await jobApplication.save();
                        try {
                                const jobDetails = await jobModel.findById(jobId);
                                const employerDetails = await userModel.findById(jobDetails.postedUser);
                                const employeeDetails = await userModel.findById(userId);
                                const message = `${employeeDetails.firstName + ' ' + employeeDetails.lastName} applied for job(Job Id: #${jobDetails.jobId})`;
                                const notification = new notificationModel({
                                        message, userId: employerDetails._id, jobId:notificationJobId
                                });
                                notification.save();
                        } catch (err) {
                                res.status(500).send({ errMsg: 'Internal server error' });
                                return;
                        }
                        res.status(200).send({ msg: 'Applied for job successfully' });
                } catch (err) {
                        res.status(401).send({ errMsg: 'Failed operation, Try later' });
                        return;
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
                let { jobId } = req.body;
                try {
                        userId = mongoose.Types.ObjectId(userId);
                        jobId = mongoose.Types.ObjectId(jobId);
                } catch (err) {
                        res.status(401).send({ errMsg: 'Data not found' });
                        return;
                }
                try {
                        let appStatus = await appliedJobModel.findOne({ $and: [{ userId }, { jobId }] });
                        if (appStatus) {
                                res.status(200).send({ msg: 'Applied for this job' });
                        } else {
                                res.status(401).send({ errMsg: 'Not applied yet' });
                        }
                } catch (err) {
                        res.status(500).send({ errMsg: 'Internal server error' });
                        return;
                }
        } else {
                res.status(401).send({ errMsg: 'Validation failed' });
        }
}
//Finding applied employees count for each job
const findApplicantCount = async (req, res) => {
        let jobId = req.params.jobId;
        try {
                jobId = mongoose.Types.ObjectId(jobId);
        } catch (err) {
                res.status(400).send({ errMsg: 'Data not found' });
                return;
        }
        try {
                const appCount = await appliedJobModel.find({ jobId }).count();
                res.status(200).send({ appCount });
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
        }
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
                try {
                        searchResult = await jobModel.aggregate([{ $match: { jobTitle: { $regex: new RegExp('.*' + jobTitle + '.*', 'i') }, delFlag: 0, listingStatus: true } },
                        { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } },
                        { $match: { 'user.companyLocation': { $regex: new RegExp('.*' + jobLocation + '.*', 'i') } } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' }
                                , { $sort: { postedDate: -1 } }]);
                } catch (err) {
                        res.status(500).send({ errMsg: 'Internal server error' });
                        return;
                }
        } else if (jobTitle) {
                try {
                        searchResult = await jobModel.aggregate([{ $match: { jobTitle: { $regex: new RegExp('.*' + jobTitle + '.*', 'i') }, delFlag: 0, listingStatus: true } },
                        { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } },
                        { $project: { 'user.password': 0 } }, { $unwind: '$user' }, { $sort: { postedDate: -1 } }]);
                } catch (err) {
                        res.status(500).send({ errMsg: 'internal server error' });
                        return;
                }
        } else if (jobLocation) {
                try {
                        searchResult = await jobModel.aggregate([{ $match: { delFlag: 0, listingStatus: true } }, { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } },
                        { $match: { 'user.companyLocation': { $regex: new RegExp('.*' + jobLocation + '.*', 'i') } } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' },
                        { $sort: { postedDate: -1 } }]);
                } catch (err) {
                        res.status(500).send({ errMsg: 'Internal server error' });
                        return;
                }
        } else {
                try {
                        searchResult = await jobModel.aggregate([{ $match: { delFlag: 0, listingStatus: true } },
                        { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } }, { $project: { 'user.password': 0 } }, { $unwind: '$user' },
                        { $sort: { postedDate: -1 } }]);
                } catch (err) {
                        res.status(500).send({ errMsg: 'Internal server error' });
                        return;
                }
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
                return;
        }
        try {
                const applicant = await appliedJobModel.aggregate([{ $match: { jobId } }, { $lookup: { from: process.env.JOB_COLLECTION, localField: 'jobId', foreignField: '_id', as: 'job' } },
                { $unwind: '$job' }, { $lookup: { from: process.env.USER_COLLECTION, localField: 'userId', foreignField: '_id', as: 'user' } }, { $unwind: '$user' },
                { $project: { 'user.password': 0 } }, { $sort: { appliedDate: -1 } }]);
                if (applicant) {
                        res.status(200).send({ applicant });
                } else {
                        res.status(401).send({ errMsg: 'Job not found' });
                }
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
                return;
        }
}
//Taking all profile datails and post of employee for checking to employer
const getEmpProfileAndPost = async (req, res) => {
        let empId = req.params.empId;
        try {
                empId = mongoose.Types.ObjectId(empId);
        } catch (err) {
                res.status(401).send({ errMsg: 'Employee not found' });
                return;
        }
        try {
                const empProfile = await userModel.findById(empId);
                const employeePosts = await postModel.find({ addedUser: empId, delFlag: 0 }).sort({ addedDate: -1 });
                if (empProfile) {
                        empProfile.password = '';
                        res.status(200).send({ empProfile, employeePosts });
                } else {
                        res.status(401).send({ errMsg: 'Employee not found' });
                }
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
        }
}
//Fetching all details of specific job
const getJobDetails = async (req, res) => {
        try {
                const jobId = req.params.jobId;
                const jobDetails = await jobModel.findById(jobId);
                res.status(200).send({ jobDetails });
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
        }
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
                return;
        }
        try {
                const jobDetails = await appliedJobModel.findOne({ jobId, userId: empId }, { applicationStatus: 1, tagStatus: 1 });
                res.status(200).send({ jobDetails });
        } catch (err) {
                res.status(500).send({ errMsg: 'Interanl server error' });
        }
}
//Selecting employees and sending response mail to employees
const updateJobAppStatus = async (req, res) => {
        let { status, applicationId, jobId, email, name } = req.body;
        try {
                applicationId = mongoose.Types.ObjectId(applicationId);
        } catch (err) {
                res.status(401).send({ errMsg: 'Data not found' });
                return;
        }
        const userEmail = 'nsabeer007@gmail.com';
        let jobDetails;
        try {
                jobDetails = await jobModel.aggregate([{ $match: { jobId } }, { $lookup: { from: process.env.USER_COLLECTION, localField: 'postedUser', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }]);
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
                return;
        }
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
        try {
                jobId = mongoose.Types.ObjectId(jobId);
                newEmpId = mongoose.Types.ObjectId(empId);
        } catch (err) {
                res.status(401).send({ errMsg: 'Data not found' });
                return;
        }
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
        try {
                jobId = mongoose.Types.ObjectId(jobId);
                userId = mongoose.Types.ObjectId(userId);
        } catch (err) {
                res.status(401).send({ errMsg: 'Data not found' });
                return;
        }
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
        try {
                let jobId = req.params.jobId;
                try {
                        jobId = mongoose.Types.ObjectId(jobId);
                } catch (err) {
                        res.status(401).send({ errMsg: 'Data not found' });
                        return;
                }
                await jobModel.findByIdAndUpdate(jobId, { delFlag: 1 });
                res.status(200).send({ msg: 'Job deleted successfully' });
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
        }
}
//Searching all tagged users of specific jobs
const getTagedUser = async (req, res) => {
        let tagedUsers;
        try {
                const jobId = req.params.jobId;
                tagedUsers = await jobModel.findOne({ jobId });
                if (tagedUsers) {
                        res.status(200).send({ tagedUsers });
                } else {
                        res.status(401).send({ errMsg: 'No details found' });
                }
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
        }
}
const getNotification = async (req, res) => {
        const userId = req.params.id;
        try {
                await notificationModel.updateMany({ readStatus: 1 });
                const notifications = await notificationModel.find({ userId }).sort({ createdAt: -1 });
                res.status(200).send({ notifications });
        } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
        }
}
const notificationCount = async (req, res) => {
        const userId = req.params.id;
        try {
                const notCount = await notificationModel.find({ userId, readStatus: 0 }).count();
                res.status(200).send({ notCount });
        } catch (err) {
                res.status(200).send({ errMsg: 'Internal server error' });
        }
}

module.exports = {
        getEmployerJobs, getAllJobs, applyJob, checkJobStatus, findApplicantCount,
        searchJob, getJobApplications, getEmpProfileAndPost, getJobDetails, getJobStatus, updateJobAppStatus, tagJob, reportJob, deleteJob, getTagedUser, getNotification, notificationCount
};