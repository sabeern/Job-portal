const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jobModel = require('../models/jobModel');
const mongoose = require('mongoose');
const jobValidator = require('../public/javascript/jobValidation');
const multer = require('multer');
//Taking all details of registered user
const getUserDetails = async (req, res) => {
    let userId = false;
    let token = req.headers['x-custom-header'];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    userId = decode.loginedUser.id;
    if (userId) {
        try {
            const userDetails = await userModel.findById(userId);
            userDetails.password = '';
            res.status(200).send({ user: userDetails });
        } catch (err) {
            res.status(500).send({ errMsg: 'Internal server error' });
            return;
        }
    } else {
        res.status(401).send({ errMsg: "Authentication failed" });
    }
}
//Posting new job
const postJob = async (req, res) => {
    const response = jobValidator.validateJobDetails(req.body);
    if (response.error) {
        res.status(401).send({ errMsg: 'Entered data not valid' });
        return;
    }
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
        const { jobTitle, salaryRange, requiredSkills, moreDetails } = req.body;
        const jobId = Math.ceil(Math.random() * 99999) + 10000;
        const newJob = new jobModel({
            jobId, jobTitle, salaryRange, requiredSkills, moreDetails, postedUser: userId
        });
        try {
            await newJob.save();
            res.status(200).send({ msg: 'Job added successfully' });
        } catch (err) {
            res.status(401).send({ errMsg: "Job posting failed" });
        }
    } else {
        res.status(401).send({ errMsg: "Authentication failed" });
    }
}
//File upload option for company profile image
const updateCompanyDetails = async (req, res) => {
    let userId = false;
    let token = req.headers['x-custom-header'];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    userId = decode.loginedUser.id;
    if (userId) {
        try {
            const { companyName, companyLocation, postImage } = req.body;
            try {
                userId = mongoose.Types.ObjectId(userId);
            } catch (err) {
                res.status(401).send({ errMsg: 'Data not found' });
                return;
            }
            if (postImage) {
                const companyLogo = postImage;
                await userModel.findByIdAndUpdate(userId, { companyName, companyLocation, profileImage: companyLogo });
            } else {
                await userModel.findByIdAndUpdate(userId, { companyName, companyLocation });
            }
            const userData = await userModel.findById(userId);
            userData.password = '';
            res.status(200).send(userData);
        } catch (err) {
            res.status(500).send({ errMsg: 'Internal server error' });
            return;
        }
    }
}
//Updating employee details and resume
const updateEmployeeDetails = async (req, res) => {
    let userId = false;
    let token = req.headers['x-custom-header'];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    userId = decode.loginedUser.id;
    if (userId) {
        try {
            const { firstName, lastName, jobTitle, qualification, experience, moreDetails, contactNumber, resume } = req.body;
            try {
                userId = mongoose.Types.ObjectId(userId);
            } catch (err) {
                res.status(401).send({ errMsg: 'Data not found' });
                return;
            }
            if (resume) {
                const employeeResume = resume;
                await userModel.findByIdAndUpdate(userId, { firstName, lastName, jobTitle, qualification, experience, details: moreDetails, contactNumber, resume: employeeResume });
            } else {
                await userModel.findByIdAndUpdate(userId, { firstName, lastName, jobTitle, qualification, experience, details: moreDetails, contactNumber });
            }
            res.status(200).send({ msg: 'Updated successfully' });
        } catch (err) {
            res.status(500).send({ errMsg: 'Internla server error' });
        }
    }
}
//Uploading employee profile image and updating in db
const employeeProfileImageUpdate = async (req, res) => {
    try {
        const { empId, postImage } = req.body;
        await userModel.findByIdAndUpdate(empId, { profileImage: postImage });
        res.status(200).send({ msg: 'Profile image changed' });
    } catch (err) {
        res.status(500).send({ errMsg: 'Internla server error' });
    }
}

module.exports = { getUserDetails, postJob, updateCompanyDetails, updateEmployeeDetails, employeeProfileImageUpdate };