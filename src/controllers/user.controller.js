const { validationResult } = require('express-validator');
const userSchema = require('../models/user.model');
// const httpError = require('../models/httpError');


const getUser = async (req, res, next) => {
    try {
        const users = await userSchema.find()
        res.status(200).send(users)
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ Error: "Invalid inputs passed, please check your data." });
        return next();
    }
    const { firstName, lastName, email, gender, dateOfBirth } = req.body;
    const createdUser = new userSchema({
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth
    });

    try {
        await createdUser.save();
    } catch (err) {
        res.status(500).json({ Error: "Creating User failed, please try again." });
        return next();
    }
    res.status(201).json({ user: createdUser });
};

const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ Error: "Invalid inputs passed, please check your data." });
        return next();
    }

    const { firstName, lastName, email, gender, dateOfBirth } = req.body;
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

    try {
        await user.save();
    } catch (err) {
        res.status(500).json({ Error: "Updating user failed please try again." });
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
    res.status(200).json({ message: 'Deleted user.' });
};

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};