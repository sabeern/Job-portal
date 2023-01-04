const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const validateToken = (req,res,next) => {
    if(req.headers['x-custom-header']) {
        try {
            token = req.headers['x-custom-header'];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            let userId = decode.loginedUser.id;
            next();
        }catch(err) {
            return res.status(401).send({errMsg:'authentication failed'}); 
        }
    }else {
    return res.status(401).send({errMsg:'authentication failed'});
    }
}

module.exports = {validateToken};