const express = require('express')
const addressRouter = express.Router()
const addressModelValidate = require('../validators/address.validator')

const {
    getAddress,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
} = require('../controllers/address.controller')

addressRouter.get('/addresses', getAddress)

addressRouter.get('/address/:id', getAddressById)

addressRouter.post('/address', addressModelValidate, createAddress)

addressRouter.patch('/address/:id', addressModelValidate, updateAddress)

addressRouter.delete('/address/:id', deleteAddress)

module.exports = addressRouter;