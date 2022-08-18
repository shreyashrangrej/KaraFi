const express = require('express')
const userRouter = express.Router()
const userModelValidate = require('../validators/userDetail.validator')

const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserPopulate
} = require('../controllers/userDetail.controller')

userRouter.get('/users', getUser)

userRouter.get('/user/:id', getUserById)

userRouter.post('/user', userModelValidate, createUser) 

userRouter.patch('/user/:id', userModelValidate, updateUser) 

userRouter.delete('/user/:id', deleteUser)

userRouter.get('/user/:id/:field', getUserPopulate )

module.exports = userRouter;