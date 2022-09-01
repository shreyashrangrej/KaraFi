const express = require('express')
const userRouter = express.Router()

const { userSignup } = require('../controllers/user.controller')

userRouter.post('/signup', userSignup)

module.exports = userRouter;