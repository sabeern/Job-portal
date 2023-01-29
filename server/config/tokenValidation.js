const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
//Jwt validation middleware for loggined routes
const validateToken = (req, res, next) => {
    if (req.headers['x-custom-header']) {
        try {
            token = req.headers['x-custom-header'];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            let userId = decode.loginedUser.id;
            next();
        } catch (err) {
            return res.status(401).send({ errMsg: 'Authentication failed' });
        }
    } else {
        return res.status(401).send({ errMsg: 'Authentication failed' });
    }
}
const adminValidateToken = async (req, res, next) => {
    if (req.headers['x-custom-header']) {
        try {
            token = req.headers['x-custom-header'];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            let userId = decode.loginedUser.id;
            try {
                const adminDetails = await userModel.findById(userId);
                if (adminDetails.userType != 'admin') {
                    res.status(401).send({ errMsg: 'Not a valid user' });
                    return;
                }
            } catch (err) {
                res.status(500).send({ errMsg: 'Internal server error' });
                return;
            }
            next();
        } catch (err) {
            return res.status(401).send({ errMsg: 'Authentication failed' });
        }
    } else {
        return res.status(401).send({ errMsg: 'Authentication failed' });
    }
}

module.exports = { validateToken, adminValidateToken };