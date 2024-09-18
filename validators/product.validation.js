const joi = require("joi");
exports.validation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    quantity: joi.number().required(),
    price:joi.number().required()
  });
  const { error, value } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
  req.body = value;
  next();
};
