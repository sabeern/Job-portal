const formValidator = require('../config/loginValidation');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
    const { userName,password } = req.body;
    const validateData = {userName,password};
    const response = formValidator.validateUser(validateData);
    if(response.error)
        {
            res.status(401).send({errMsg:'Entered data not valid'});
            return;
        }
    const user = await userModel.findOne({userName});
    if(user) {
            const passwordCheck = await bcrypt.compare(password, user.password);
            if(passwordCheck) {
                const payload = {
                    loginedUser: {
                      id: user._id,
                    },
                  };
                  const token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '7 days' }
                  );
                  user.password = '';
                  res.status(200).send({ token, user });
            }else {
                res.status(401).send({errMsg:'Username or password invalid'});
            }
    }else {
        res.status(401).send({errMsg:'User not exist'});
    }
}

module.exports = {login};