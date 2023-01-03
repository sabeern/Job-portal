const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const formValidator = require('../config/loginValidation');
const nodemailer = require('nodemailer');
const otpModel = require('../models/otpModel');
const { db } = require('../models/userModel');

const userExistCheck = async (req,res,next) => {
    const {userName} = req.body;
    const userExist = await userModel.findOne({userName});
    if(userExist) {
        res.status(401).send({errMsg:'User already exist'});
    }else {
        next();
    }
} 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASSWORD
    }
  });
const signup = async (req,res) => {
    const {userName, userType, password} = req.body;
    const validateData = {userName,password};
    const response = formValidator.validateUser(validateData);
    if(response.error)
        {
            res.status(401).send({errMsg:'Entered data not valid'});
            return;
        }
        const userEmail = 'nsabeer007@gmail.com'
        const Otp = Math.floor(1000 + Math.random() * 9999);
        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: userEmail,
            subject: 'Job solutions email verification',
            html: `<p>use this code for Job Solutions email verification <b>${Otp}</b></p>`
          }
            transporter.sendMail(mailOptions, async function(error, info){
              if (error) {
                res.status(401).send({errMsg:'Otp sending failed'});
              } else {
                const newOtp = new otpModel({
                    userEmail : userName,
                    userOtp : Otp,
                    otpExpiry : Date.now() + (1000*60*2)
                });
                try {
                    newOtp.save();
                    res.status(200).send({msg:'Please enter the otp'});
                }catch(err) {
                    res.status(200).send({errMsg:'User registration failed'});
                }
                 
              }
            });
    
}
const validateOtp = async (req,res) => {
    const {userName, userType, password, userOtp} = req.body;
    await otpModel.deleteMany({otpExpiry:{$lt:new Date()}});
    const otpVerification = await otpModel.findOne({userEmail:userName,userOtp});
    if(otpVerification) {
        const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));
        const user = new userModel({userName, userType, password:hashPassword});
        await user.save();
        res.status(200).send({msg:'Signup successfull'});
    }else {
        res.status(401).send({errMsg:'OTP verification failed'});
    }
}

module.exports = { signup, userExistCheck, validateOtp };