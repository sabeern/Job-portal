const jobModel = require('../models/jobModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const getEmployerJobs = async (req,res) => {
    let userId=false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if(userId) { 
                userId = mongoose.Types.ObjectId(userId);
                const employerJobs = await jobModel.find({postedUser:userId});
                res.status(200).send({employerJobs});
        }else {
            res.status(401).send({errMsg:'Validation failed'});
        }
}

module.exports = { getEmployerJobs };