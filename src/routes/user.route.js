const express = require('express')
const userRouter = express.Router()

const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller.js')

userRouter.get('/users', getUser)

userRouter.get('/user/:id', getUserById)

userRouter.post('/user', createUser) 

userRouter.patch('/user/:id', updateUser) 

userRouter.delete('/user/:id', deleteUser)

module.exports = userRouter;