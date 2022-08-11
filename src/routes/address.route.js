const express = require('express')
const addressRouter = express.Router()

const {
    getAddress,
    getAddressById,
    createAddress
} = require('../controllers/address.controller')

addressRouter.get('/addresses', getAddress)

addressRouter.get('/address/:id', getAddressById)

addressRouter.post('/address', createAddress)

module.exports = addressRouter;