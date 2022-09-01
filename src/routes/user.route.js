const express = require('express')
const userRouter = express.Router()

userRouter.post('/signup', userSignup)