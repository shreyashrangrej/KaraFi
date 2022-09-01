const express = require('express')
const userDetailRouter = express.Router()
const userDetailModelValidate = require('../validators/userDetail.validator')

const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserPopulate
} = require('../controllers/userDetail.controller')

userDetailRouter.get('/users', getUser)

userDetailRouter.get('/user/:id', getUserById)

userDetailRouter.post('/user', userDetailModelValidate, createUser) 

userDetailRouter.patch('/user/:id', userDetailModelValidate, updateUser) 

userDetailRouter.delete('/user/:id', deleteUser)

userDetailRouter.get('/user/:id/:field', getUserPopulate )

module.exports = userDetailRouter;