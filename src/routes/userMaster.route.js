const express = require('express')
const userMasterRouter = express.Router()
const userMasterModelValidate = require('../validators/userMaster.validator')
const upload = require('../middleware/upload')

const {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    getUserPopulate,
    createUserImage,
    deleteUserImage
} = require('../controllers/userMaster.controller')

userMasterRouter.get('/users', getUser)

userMasterRouter.get('/user/:id', getUserByEmail)

userMasterRouter.post('/user', userMasterModelValidate, createUser)

userMasterRouter.patch('/user/:id', userMasterModelValidate, updateUser) 

userMasterRouter.delete('/user/:id', deleteUser)

userMasterRouter.get('/user/:id/:fields', getUserPopulate)

userMasterRouter.post('/user/image/:id', upload.single('userImage'), createUserImage)

userMasterRouter.delete('/user/image/:id', deleteUserImage)

module.exports = userMasterRouter;