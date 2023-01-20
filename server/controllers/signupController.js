const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const formValidator = require('../config/loginValidation');
const nodemailer = require('nodemailer');
const otpModel = require('../models/otpModel');
const { db } = require('../models/userModel');
//Checking the user exist or not for curresponding email
const userExistCheck = async (req, res, next) => {
  const { userName } = req.body;
  const userExist = await userModel.findOne({ userName });
  if (userExist) {
    res.status(401).send({ errMsg: 'User already exist' });
  } else {
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
//After checking user exist, sending otp to user
const signup = async (req, res) => {
  const { userName, userType, password } = req.body;
  const validateData = { userName, password };
  const response = formValidator.validateUser(validateData);
  if (response.error) {
    res.status(401).send({ errMsg: 'Entered data not valid' });
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
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      res.status(401).send({ errMsg: 'Otp sending failed' });
    } else {
      const newOtp = new otpModel({
        userEmail: userName,
        userOtp: Otp,
        otpExpiry: Date.now() + (1000 * 60 * 2)
      });
      try {
        newOtp.save();
        res.status(200).send({ msg: 'Please enter the otp' });
      } catch (err) {
        res.status(200).send({ errMsg: 'User registration failed' });
      }

    }
  });
}
//Validate Otp and after success inserting user details
const validateOtp = async (req, res) => {
  const { userName, userType, password, userOtp } = req.body;
  await otpModel.deleteMany({ otpExpiry: { $lt: new Date() } });
  const otpVerification = await otpModel.findOne({ userEmail: userName, userOtp });
  if (otpVerification) {
    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));
    const user = new userModel({ userName, userType, password: hashPassword });
    await user.save();
    res.status(200).send({ msg: 'Signup successfull' });
  } else {
    res.status(401).send({ errMsg: 'OTP verification failed' });
  }
}
//Sending otp for reseting password
const forgotSendOtp = async (req, res) => {
  const { userName } = req.body;
  const user = await userModel.findOne({ userName });
  if (!user) {
    res.status(401).send({ errMsg: 'User not exist' });
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
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      res.status(401).send({ errMsg: 'Otp sending failed' });
    } else {
      const newOtp = new otpModel({
        userEmail: userName,
        userOtp: Otp,
        otpExpiry: Date.now() + (1000 * 60 * 2)
      });
      try {
        newOtp.save();
        res.status(200).send({ msg: "Please Enter Otp", userId: user._id });
      } catch (err) {
        res.status(401).send({ errMsg: 'Password changing failed' });
      }
    }
  });
}
//Checking reset password otp and after success giving option to password change
const resetOtpValidate = async (req, res) => {
  const { userName, userOtp } = req.body;
  await otpModel.deleteMany({ otpExpiry: { $lt: new Date() } });
  const otpVerification = await otpModel.findOne({ userEmail: userName, userOtp });
  if (otpVerification) {
    res.status(200).send({ msg: 'Otp verified' });
  } else {
    res.status(401).send({ errMsg: 'OTP verification failed' });
  }
}
//Updating new password of user
const updatePassword = async (req, res) => {
  const { userId, password } = req.body;
  const encryptPassword = await bcrypt.hash(password, Number(process.env.SALT));
  await userModel.findByIdAndUpdate(userId, { password: encryptPassword });
  res.status(200).send({ msg: 'Updated successfully' });
}

module.exports = { signup, userExistCheck, validateOtp, forgotSendOtp, resetOtpValidate, updatePassword };