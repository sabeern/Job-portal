const formValidator = require('../../config/loginValidation');
const userModel = require('../../models/userModel');
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
    const adminDetails = await userModel.findOne({userName,userType:'admin'});
    if(adminDetails) {
            const passwordCheck = await bcrypt.compare(password, adminDetails.password);
            if(passwordCheck) {
                const payload = {
                    loginedUser: {
                      id: adminDetails._id,
                    },
                  };
                  const adminToken = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '7 days' }
                  );
                  adminDetails.password = '';
                  res.status(200).send({ adminToken, adminDetails });
            }else {
                res.status(401).send({errMsg:'Username or password invalid'});
            }
    }else {
        res.status(401).send({errMsg:'User not exist'});
    }
}

module.exports = { login };