const express = require("express");
const router = express.Router();
const { loginvalidation } = require("../validators/login.validation");
const { validation } = require("../validators/signup.validatation");
const { register, login } = require("../controllers/user.controller");
router.post("/signup", validation, register);
router.post("/login",loginvalidation, login);
module.exports = router;
