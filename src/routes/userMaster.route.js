const express = require('express')
const router = express.Router()
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

router.get('/users', getUser)

router.get('/user/:id', getUserByEmail)

router.post('/user', userMasterModelValidate, createUser)

router.patch('/user/:id', userMasterModelValidate, updateUser) 

router.delete('/user/:id', deleteUser)

router.get('/user/:id/:fields', getUserPopulate)

router.post('/user/image/:id', upload.single('userImage'), createUserImage)

router.delete('/user/image/:id', deleteUserImage)

module.exports = router;