const jwt = require('jsonwebtoken')
const createError = require("http-errors");
const schema = require('./models/user.schema')
exports.verifytoken = (req,res,next)=>{
  if(!req.headers.authorization) return next(createError("Please enter  the token"))
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token,process.env.SECRET,async(err,decode)=>{
    if(err) return  next(createError("The token is invalid"))
    const user = await schema.findOne({email:decode.email})
    if(!user) return next(createError("user not found"))
    req.user = user
    next()
  })
}