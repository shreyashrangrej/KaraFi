const express = require('express')
const router = express.Router()
const addressModelValidate = require('../validators/address.validator')

const {
    getAddress,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressPopulate
} = require('../controllers/address.controller')

router.get('/addresses', getAddress)

router.get('/address/:id', getAddressById)

router.post('/address', addressModelValidate, createAddress)

router.patch('/address/:id', addressModelValidate, updateAddress)

router.delete('/address/:id', deleteAddress)

router.get('/address/:id/:field', getAddressPopulate)

module.exports = router;