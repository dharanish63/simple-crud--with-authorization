const joi = require("joi");
exports.validation = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().required(),
    password: joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: joi
      .string()
      .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  });
  const { error, value } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
  req.body = value;
  next();
};
