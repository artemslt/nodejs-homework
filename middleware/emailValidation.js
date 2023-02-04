const Joi = require("joi");

const emailValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: true },
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }
  next();
};

module.exports = { emailValidation };
