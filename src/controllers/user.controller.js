const { validationResult } = require('express-validator');
const userSchema = require('../models/user.model');

const getUser = async (req, res, next) => {
    try {
        const user = await userSchema.find()
        res.status(200).send({ users: user })
    } catch (err) {
        return res.status(404).json({ Error: "Something went wrong, could not find users." });
    }
};

const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    let user;
    try {
        user = await userSchema.findById(userId);
    } catch (err) {
        res.status(404).json({ Error: "Something went wrong, could not find user: " + userId });
        return next();
    }
    if (!user) {
        return res.status(404).json({ Error: "Could not find the user for provided ID: " + userId });
    }
    res.json({ user: user.toObject({ getters: true }) });
};

const createUser = async (req, res, next) => {
    const { firstName, lastName, email, gender, dateOfBirth, phoneNumber } = req.body;
    const createdUser = new userSchema({
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth,
        phoneNumber
    });

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            });
        }
        await createdUser.save();
    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ Error: err.message });
        } else {
            res.status(500).json({ Error: "Creating User failed, please try again." });
        }
        return next();
    }
    res.status(200).json({ user: createdUser.toObject({ getters: true }) });
};

const updateUser = async (req, res, next) => {
    const { firstName, lastName, email, gender, dateOfBirth, phoneNumber } = req.body;
    const userId = req.params.id;

    let user;
    try {
        user = await userSchema.findById(userId);
    } catch (err) {
        res.status(500).json({ Error: "Could not find the user for provided ID: " + userId });
        return next();
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.gender = gender;
    user.dateOfBirth = dateOfBirth;
    user.phoneNumber = phoneNumber;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            });
        }
        await user.save();
    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ Error: err.message });
        } else {
            res.status(500).json({ Error: "Updating User failed, please try again." });
        }
        return next();
    }
    res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    let user;
    try {
        user = await userSchema.findById(userId);
    } catch (err) {
        res.status(404).json({ error: "Cannot find user with provided Id:" + userId });
        return next();
    }

    try {
        await user.remove();
    } catch (err) {
        res.status(500).json({ error: "Something went wrong, could not delete user:" + userId });
        return next();
    }
    res.status(200).json({ deletedUser: user.toObject({ getters: true }) });
};

const getUserPopulate = async (req, res, next) => {
    const userId = req.params.id;
    const populateField = req.params.field;

    let user;
    try {
        user = await userSchema.findById(userId).populate(populateField);
    } catch (err) {
        res.status(404).json({ Error: "Something went wrong, could not find user: " + userId });
        return next();
    }
    if (!user) {
        return res.status(404).json({ Error: "Could not find the user for provided ID: " + userId });
    }
    res.json({ user: user.toObject({ getters: true }) });
};

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserPopulate
};