const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const schema = require("../models/user.schema");
exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(password);
  const exist = await schema.findOne({ $or: [{ username }, { email }] });
  if (exist) return next(createError("This username and email already in use"));
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await schema.create({ username, password: hash, email });
    res.json(user);
  } catch (error) {
    return next(createError(500, "Unable to handle request"));
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await schema.findOne({ email });
    if (!user) return next(createError(404, "user not found"));
    if (!(await bcrypt.compare(password, user.password)))
      return next(createError(404, "Invalid password"));
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30d" });
    console.log(token);
    res.json({ user: { email: user.email, id: user._id }, token });
  } catch (error) {
    res.json(error.message);
  }
};
