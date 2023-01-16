const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jobModel = require('../models/jobModel');
const mongoose = require('mongoose');
const jobValidator = require('../public/javascript/jobValidation');
const multer = require('multer');

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
        const jobId = Math.ceil(Math.random()*99999)+10000;
        const newJob = new jobModel({
            jobId,jobTitle,salaryRange,requiredSkills,moreDetails,postedUser:userId
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
const fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./public/images');
    },
    filename:(req,file,cb) => {
        let fileName = file.originalname;
        fileName = fileName.replaceAll(' ','_');
        cb(null,Date.now()+fileName);
    }
  });
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
const upload = multer({storage:fileStorageEngine,fileFilter});  
const uploadSingleImage = upload.single('photo');
const updateCompanyDetails = (req,res) => {
    uploadSingleImage(req,res,async err => {
        if(err) {
            res.status(401).send({errMsg:err.message});
            return;
        }
        let userId=false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if(userId) {
            const companyDetails = JSON.parse(req.body.companyDetails);
            const { companyName, companyLocation } = companyDetails;
            mongoose.Types.ObjectId(userId);
            if(req.file) {
                const companyLogo = req.file.filename;
                await userModel.findByIdAndUpdate(userId, {companyName,companyLocation,profileImage:companyLogo});
            }else {
                await userModel.findByIdAndUpdate(userId, {companyName,companyLocation});
            }
            const userData = await userModel.findById(userId);
            userData.password = '';
            res.status(200).send(userData);
        }else {
            res.status(401).send({errMsg:'Authentication failed'});
        }
    })
}
const resumeStorageEngine = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./public/resume');
    },
    filename:(req,file,cb) => {
        let fileName = file.originalname;
        fileName = fileName.replaceAll(' ','_');
        cb(null,Date.now()+fileName);
    }
  });
const resumeFilter = (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      return cb(new Error('Only .pdf format allowed!'));
    }
  }
  const uploadResume = multer({storage:resumeStorageEngine,fileFilter:resumeFilter});  
const uploadSingleResume = uploadResume.single('resume');
const updateEmployeeDetails = (req,res) => {
    uploadSingleResume(req,res,async err => {
        if(err) {
            res.status(401).send({errMsg:err.message});
            return;
        }
        let userId=false;
        let token = req.headers['x-custom-header'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.loginedUser.id;
        if(userId) {
            const employeeDetails = JSON.parse(req.body.employeeDetails);
            const { firstName, lastName, jobTitle, qualification, experience, moreDetails, contactNumber } = employeeDetails;
            mongoose.Types.ObjectId(userId);
            if(req.file) {
                const employeeResume = req.file.filename;
                await userModel.findByIdAndUpdate(userId, {firstName, lastName, jobTitle, qualification, experience, details:moreDetails, contactNumber,resume:employeeResume});
            }else {
                await userModel.findByIdAndUpdate(userId, {firstName, lastName, jobTitle, qualification, experience, details:moreDetails, contactNumber});
            }
            res.status(200).send({msg:'Updated successfully'});
        }else {
            res.status(401).send({errMsg:'Authentication failed'});
        }
    })
}

module.exports = { getUserDetails, postJob, updateCompanyDetails, updateEmployeeDetails };