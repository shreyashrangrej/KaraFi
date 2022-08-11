const express = require('express')
const addressRouter = express.Router()

const {
    getAddress,
    getAddressById,
    createAddress
} = require('../controllers/address.controller')

userRouter.get('/addresses', getAddress)

userRouter.get('/address/:id', getAddressById)

userRouter.post('/address', createAddress)

module.exports = addressRouter;