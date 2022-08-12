const { validationResult } = require('express-validator');
const addressSchema = require('../models/address.model');

const userSchema = require('../models/user.model');

const getAddress = async (req, res, next) => {
    try {
        const address = await addressSchema.find()
        res.status(200).send({ address: address })
    } catch (err) {
        return res.status(404).json({ Error: "Something went wrong, could not find addresses." });
    }
};

const getAddressById = async (req, res, next) => {
    const addressId = req.params.id;
    let address;
    try {
        address = await addressSchema.findById(addressId);
    } catch (err) {
        res.status(404).json({ Error: "Something went wrong, could not find address: " + addressId });
        return next();
    }
    if (!address) {
        return res.status(404).json({ Error: "Could not find the address for provided ID: " + addressId });
    }
    res.json({ address: address.toObject({ getters: true }) });
};

const createAddress = async (req, res, next) => {
    const { addressLine1, addressLine2, country, state, district, city, zipCode, user } = req.body;
    const createdAddress = new addressSchema({
        addressLine1,
        addressLine2,
        country,
        state,
        district,
        city,
        zipCode,
        user,
    });

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            });
        }
        await createdAddress.save();


    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ Error: err.message });
        } else {
            res.status(500).json({ Error: "Creating address failed, please try again." });
        }
        return next();
    }

    try {
        const findUser = await userSchema.findById(user)
        findUser.address = createdAddress.id
        findUser.save()
    } catch (err) {
        //Need to add some error message here
        return next()
    }

    res.status(200).json({ address: createdAddress.toObject({ getters: true }) });
};

const updateAddress = async (req, res, next) => {
    const { addressLine1, addressLine2, country, state, district, city, zipCode } = req.body;
    const addressId = req.params.id;

    let address;
    try {
        address = await addressSchema.findById(addressId);
    } catch (err) {
        res.status(500).json({ Error: "Could not find the address for provided ID: " + userId });
        return next();
    }

    address.addressLine1 = addressLine1;
    address.addressLine2 = addressLine2;
    address.country = country;
    address.state = state;
    address.district = district;
    address.city = city;
    address.zipCode = zipCode;

    try {
        await address.save();
    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ Error: err.message });
        } else {
            res.status(500).json({ Error: "Updating address failed, please try again." });
        }
        return next();
    }
    res.status(200).json({ address: address.toObject({ getters: true }) });
};

const deleteAddress = async (req, res, next) => {
    const addressId = req.params.id;

    let address;
    try {
        address = await addressSchema.findById(addressId);
    } catch (err) {
        res.status(404).json({ error: "Cannot find address with provided Id:" + addressId });
        return next();
    }

    try {
        await address.remove();
    } catch (err) {
        res.status(500).json({ error: "Something went wrong, could not delete address:" + addressId });
        return next();
    }
    res.status(200).json({ deletedAddress: address.toObject({ getters: true }) });
};

module.exports = {
    getAddress,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
};