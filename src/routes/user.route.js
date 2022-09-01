const express = require('express')
const userRouter = express.Router()

const { userSignup, userLogin, userGet } = require('../controllers/user.controller')
const auth = require('../middleware/auth')

userRouter.post('/signup', userSignup)

userRouter.post('/login', userLogin)

userRouter.get('/me', auth, userGet)

module.exports = userRouter;