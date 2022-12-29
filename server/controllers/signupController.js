const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const formValidator = require('../config/loginValidation');

const userExistCheck = async (req,res,next) => {
    const {userName} = req.body;
    const userExist = await userModel.findOne({userName});
    if(userExist) {
        res.send({errMsg:'User already exist'});
    }else {
        next();
    }
}
const signup = async (req,res) => {
    const {userName, userType, password} = req.body;
    const validateData = {userName,password};
    const response = formValidator.validateUser(validateData);
    if(response.error)
        {
            res.send({errMsg:'Entered data not valid'});
            return;
        }
    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));
    const user = new userModel({userName, userType, password:hashPassword});
    try {
        await user.save();
        res.send({msg:'Data added successfully'});
    }
    catch(err) {
        res.send({errMsg:'User registration failed'});
    }
}

module.exports = { signup, userExistCheck };