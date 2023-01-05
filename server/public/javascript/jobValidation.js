const Joi = require('joi');
const validateJobDetails = (jobDetails) => {
    const JoiSchema = Joi.object({
                jobTitle: Joi.string()
                        .min(3)
                        .required(),
                salaryRange: Joi.string()
                        .required(),
                requiredSkills: Joi.string()
                        .required(),
                moreDetails: Joi.string()
                        .required(),
            });
            return JoiSchema.validate(jobDetails);
}

module.exports = { validateJobDetails };