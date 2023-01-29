const { default: mongoose } = require('mongoose');
const jobModel = require('../../models/jobModel');
const reportJobModel = require('../../models/reportJobModel');
const userModel = require('../../models/userModel');
const applicationModel = require('../../models/appliedJobModel');
//Get all employee posted issues in admin side
const getJobIssues = async (req, res) => {
    const allJobIssues = await reportJobModel.aggregate([{ $lookup: { from: process.env.JOB_COLLECTION, localField: 'jobId', foreignField: '_id', as: 'job' } }, { $unwind: '$job' },
    { $lookup: { from: process.env.USER_COLLECTION, localField: 'issuedUser', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }]);
    res.status(200).send({ allJobIssues });
}
//Block or unblock job if needed
const blockJob = async (req, res) => {
    try {
        let { jobId, blockStatus } = req.body;
        try {
            jobId = mongoose.Types.ObjectId(jobId);
        } catch (err) {
            res.status(401).send({ errMsg: 'Data not found' });
            return;
        }
        await jobModel.findByIdAndUpdate(jobId, { listingStatus: !blockStatus });
        res.status(200).send({ msg: 'Job blocked' });
    } catch (err) {
        res.status(500).send({ errMsg: 'Internal server error' });
    }
}
const getDetails = async (req, res) => {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date();
    try {
        const monthlyEmployeeCount = await userModel.aggregate([{ $match: { delFlag: 0, registeredDate: { $gte: startDate, $lte: endDate }, userType: 'Job Seeker' } },
        { $group: { _id: { $substr: ['$registeredDate', 0, 7] }, count: { $sum: 1 } } }]);
        const monthlyEmployerCount = await userModel.aggregate([{ $match: { delFlag: 0, registeredDate: { $gte: startDate, $lte: endDate }, userType: 'Job Provider' } },
        { $group: { _id: { $substr: ['$registeredDate', 0, 7] }, count: { $sum: 1 } } }]);
        const applicationCount = await applicationModel.aggregate([{ $match: { appliedDate: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: { $substr: ['$appliedDate', 0, 7] }, count: { $sum: 1 } } }]);
        res.status(200).send({ monthlyEmployeeCount, monthlyEmployerCount, applicationCount })
    } catch (err) {
        res.status(500).send({ errMsg: 'Server erroe' });
    }
}
const employeeDetails = async (req, res) => {
    try {
        const empDetails = await userModel.find({ delFlag: 0, userType: 'Job Seeker' }).sort({ registeredDate: -1 });
        res.status(200).send({ empDetails });
    } catch (err) {
        res.status(500).send({ errMsg: 'Internal server error' });
    }
}
const employerDetails = async (req, res) => {
    try {
        const emprDetails = await userModel.find({ delFlag: 0, userType: 'Job Provider' }).sort({ registeredDate: -1 });
        res.status(200).send({ emprDetails });
    } catch (err) {
        res.status(500).send({ errMsg: 'Internal server error' });
    }
}
const blockUnblockUser = async (req, res) => {
    let { userId, status } = req.body;
    let update;
    if (status == 'true') {
        update = false;
    } else {
        update = true;
    }
    try {
        const test = await userModel.findByIdAndUpdate(userId, { blockStatus: update });
        res.status(200).send({ msg: 'Updated successfully' });
    } catch (err) {
        res.status(500).send({ errMsg: 'internal server error' })
    }
}

module.exports = { getJobIssues, blockJob, getDetails, employeeDetails, employerDetails, blockUnblockUser };