const Joi = require('joi');
// Joi validator for login page validation
const validateUser = (user) => {
        const JoiSchema = Joi.object({
                password: Joi.string()
                        .min(5)
                        .max(30)
                        .required(),
                userName: Joi.string()
                        .email()
                        .required(),
        });
        return JoiSchema.validate(user);
}

module.exports = { validateUser };