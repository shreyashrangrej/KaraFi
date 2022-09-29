const express = require('express')
const userDetailRouter = express.Router()
const userDetailModelValidate = require('../validators/userDetail.validator')
const upload = require('../middleware/upload')
const { authJwt } = require('../authentication/middlewares')

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

userDetailRouter.get('/users', [authJwt.verifyToken, authJwt.isCompanyAdmin], getUser)

userDetailRouter.get('/user/:id', [authJwt.verifyToken, authJwt.isCompanyAdmin], getUserById)

userDetailRouter.post('/user', [authJwt.verifyToken, authJwt.isCompanyAdmin], userDetailModelValidate, createUser) 

userDetailRouter.patch('/user/:id', [authJwt.verifyToken, authJwt.isCompanyAdmin], userDetailModelValidate, updateUser) 

userDetailRouter.delete('/user/:id', [authJwt.verifyToken, authJwt.isCompanyAdmin], deleteUser)

userDetailRouter.get('/user/:id/:fields', [authJwt.verifyToken, authJwt.isCompanyAdmin], getUserPopulate)

userDetailRouter.post('/user/image/:id', [authJwt.verifyToken, authJwt.isCompanyAdmin], upload.single('userImage'), createUserImage)

userDetailRouter.delete('/user/image/:id', [authJwt.verifyToken, authJwt.isCompanyAdmin], deleteUserImage)

module.exports = userDetailRouter;