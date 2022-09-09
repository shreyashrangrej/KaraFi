const express = require('express')
const userDetailRouter = express.Router()
const userDetailModelValidate = require('../validators/userDetail.validator')
const upload = require('../middleware/upload')

const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserPopulate,
    createUserImage,
    deleteUserImage
} = require('../controllers/userDetail.controller')

userDetailRouter.get('/users', getUser)

userDetailRouter.get('/user/:id', getUserById)

userDetailRouter.post('/user', userDetailModelValidate, createUser) 

userDetailRouter.patch('/user/:id', userDetailModelValidate, updateUser) 

userDetailRouter.delete('/user/:id', deleteUser)

userDetailRouter.get('/user/:id/:field', getUserPopulate)

userDetailRouter.post('/user/image/:id', upload.single('userImage'), createUserImage)

userDetailRouter.delete('/user/image/:id', deleteUserImage)

module.exports = userDetailRouter;