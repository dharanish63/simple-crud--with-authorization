const bcrypt = require('bcrypt')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const schema = require('../models/user.schema')
exports.create = async(req,res ,next)=>{
  const {username,password,email} = req.body
  console.log(password)
  if(!username || !password || !email) return next(createError("Please enter all the fields"))
  const exist = await schema.findOne({$or:[{username},{email}]})
  if(exist) return next(createError("This username and email already in use"))  
  const hash = await bcrypt.hash(password,10)
  try {
    const user = await schema.create({username,password:hash,email})
    res.json(user)
  } catch (error) {
    return next(createError(500, "Unable to handle request")); 
  }
  
 
   
} 
exports.single = async(req,res,next)=>{
  const {email,password} = req.body
  if(!email||!password) return  next(createError("Please check all the fields"))
    const hash = await bcrypt.hash(password,10)
    const exist = await schema.findOne({$or:[{email},{password:hash}]})
    if(!exist) return next(createError("user not found"))
    const payload = {id:exist._id,email:exist.email}
  try {
     const generatetoken = jwt.sign(payload,process.env.SECRET,{expiresIn:'30d'})
     console.log(generatetoken)
     res.json({user:exist,token:generatetoken})
  } catch (error) {
    res.json(error.message)
  }
}