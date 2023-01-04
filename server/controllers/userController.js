const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

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

module.exports = {getUserDetails};