const { validationResult } = require('express-validator');
const addressSchema = require('../models/address.model');

const userSchema = require('../models/userMaster.model');

const getAddress = async (req, res, next) => {
    try {
        const address = await addressSchema.find()
        res.status(200).send({ addresses: address })
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
    res.status(200).send({ address: address })
};

const createAddress = async (req, res, next) => {
    const { addressLine1, addressLine2, country, state, district, city, zipCode, userDetail } = req.body;
    const createdAddress = new addressSchema({
        addressLine1,
        addressLine2,
        country,
        state,
        district,
        city,
        zipCode,
        userDetail,
    });

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            });
        }
        try {
            const findUser = await userSchema.findById(userDetail)
            if (!findUser) {
                return res.status(404).json({ error: 'Could not find user for provided user ID: ' + userDetail })
            }
            findUser.address = createdAddress.id
            await createdAddress.save();
            await findUser.save();
        } catch {
            res.status(500).json({ error: 'Something went wrong please try again.' })
            return next()
        }
    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ Error: err.message });
        } else {
            res.status(500).json({ Error: "Creating address failed, please try again." });
        }
        return next();
    }

    res.status(200).json({ address: createdAddress });
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
    res.status(200).json({ address: address });
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
    res.status(200).json({ deletedAddress: address });
};

const getAddressPopulate = async (req, res, next) => {
    const addressId = req.params.id;
    const populateField = req.params.field;

    let address;
    try {
        address = await addressSchema.findById(addressId).populate(populateField);
    } catch (err) {
        res.status(404).json({ Error: "Something went wrong, could not find address: " + addressId });
        console.log(err)
        return next();
    }
    if (!address) {
        return res.status(404).json({ Error: "Could not find the address for provided ID: " + addressId });
    }
    res.status(200).json({ address: address });
};

module.exports = {
    getAddress,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressPopulate
};