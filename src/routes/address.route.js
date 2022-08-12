const express = require('express')
const addressRouter = express.Router()

const {
    getAddress,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
} = require('../controllers/address.controller')

addressRouter.get('/addresses', getAddress)

addressRouter.get('/address/:id', getAddressById)

addressRouter.post('/address', createAddress)

addressRouter.patch('/address/:id', updateAddress)

addressRouter.delete('/address/:id', deleteAddress)

module.exports = addressRouter;