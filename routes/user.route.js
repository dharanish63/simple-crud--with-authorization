const express = require('express')
const router = express.Router()
const {create,single} =require('../controllers/user.controller')
router.post('/signup',create)
router.post('/login',single)
module.exports = router