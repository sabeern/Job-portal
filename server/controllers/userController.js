const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jobModel = require('../models/jobModel');
const mongoose = require('mongoose');
const jobValidator = require('../public/javascript/jobValidation');

const getUserDetails = async (req,res) => {
    let userId=false;
    let token = req.headers['x-custom-header'];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    userId = decode.loginedUser.id;
    if(userId) {
        const userDetails = await userModel.findById(userId);
        userDetails.password = '';
        res.status(200).send({user:userDetails});
    }else {
        res.status(401).send({errMsg:"Authentication failed"});
    }
}

const postJob = async (req,res) => {
    const response = jobValidator.validateJobDetails(req.body);
    if(response.error)
        {
            res.status(401).send({errMsg:'Entered data not valid'});
            return;
        }
    let userId=false;
    let token = req.headers['x-custom-header'];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    userId = decode.loginedUser.id;
    if(userId) {
        userId = mongoose.Types.ObjectId(userId);
        const {jobTitle,salaryRange,requiredSkills,moreDetails} = req.body;
        const newJob = new jobModel({
            jobTitle,salaryRange,requiredSkills,moreDetails,postedUser:userId
        });
        try {
            await newJob.save();
            res.status(200).send({msg:'Job added successfully'});
        }catch(err) {
            res.status(401).send({errMsg:"Job posting failed"});
        }
    }else {
        res.status(401).send({errMsg:"Authentication failed"});
    }
}
const updateCompanyDetails = (req,res) => {
    console.log(req.body);
}

module.exports = { getUserDetails, postJob };