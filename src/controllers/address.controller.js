const addressSchema = require('../models/address.model');

const getAddress = async (req, res, next) => {
    try {
        const address = await addressSchema.find()
        res.status(200).send({ users: address })
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
    const {  } = req.body;
    const createdAddress = new addressSchema({

    });

    try {
        await createdAddress.save();
    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ Error: err.message });
        } else {
            res.status(500).json({ Error: "Creating address failed, please try again." });
        }
        return next();
    }
    res.status(200).json({ user: createdAddress.toObject({ getters: true }) });
};

module.exports = {
    getAddress,
    getAddressById,
    createAddress
};