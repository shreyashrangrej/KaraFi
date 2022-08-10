const express = require('express')
const userRouter = express.Router()
const userModelValidate = require('../validators/user.validator')

const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller.js')

userRouter.get('/users', getUser)

userRouter.get('/user/:id', getUserById)

userRouter.post('/user', userModelValidate, createUser) 

userRouter.patch('/user/:id', userModelValidate, updateUser) 

userRouter.delete('/user/:id', deleteUser)

module.exports = userRouter;