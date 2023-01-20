const { default: mongoose } = require('mongoose');
const jobModel = require('../../models/jobModel');
const reportJobModel = require('../../models/reportJobModel');
//Get all employee posted issues in admin side
const getJobIssues = async (req, res) => {
    const allJobIssues = await reportJobModel.aggregate([{ $lookup: { from: process.env.JOB_COLLECTION, localField: 'jobId', foreignField: '_id', as: 'job' } }, { $unwind: '$job' },
    { $lookup: { from: process.env.USER_COLLECTION, localField: 'issuedUser', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }]);
    res.status(200).send({ allJobIssues });
}
//Blick issu posted jobs if needed
const blockJob = async (req, res) => {
    let { jobId, blockStatus } = req.body;
    jobId = mongoose.Types.ObjectId(jobId);
    await jobModel.findByIdAndUpdate(jobId, { listingStatus: !blockStatus });
    res.status(200).send({ msg: 'Job blocked' });
}

module.exports = { getJobIssues, blockJob };