const { validationResult } = require('express-validator');

const httpError = require('../models/httpError');
const userSchema = require('../models/user.model');


const getUser = async (req, res, next) => {
    try {
        const users = await userSchema.find()
        res.status(200).send(users)
    } catch (e) {
        const error = new httpError(
            'Something went wrong, could not find a user.',
            500
        );
        return next(error);
    }
};

const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    let user;
    try {
        user = await userSchema.findById(userId);
    } catch (err) {
        const error = new httpError(
            'Something went wrong, could not find a user.',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new httpError(
            'Could not find a user for the provided id.',
            404
        );
        return next(error);
    }
    res.json({ user: user.toObject({ getters: true }) });
};

const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new httpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { firstName, lastName, email } = req.body;
    const createdUser = new userSchema({
        firstName,
        lastName,
        email
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new httpError(
            'Creating User failed, please try again.',
            500
        );
        return next(error);
    }
    res.status(201).json({ user: createdUser });
};

const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new httpError('Invalid inputs passed, please check your data.', 422);
    }

    const { firstName, lastName, email } = req.body;
    const userId = req.params.id;

    let user;
    try {
        user = await userSchema.findById(userId);
    } catch (err) {
        const error = new httpError(
            'Something went wrong, could not update user.',
            500
        );
        return next(error);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    try {
        await user.save();
    } catch (err) {
        const error = new httpError(
            'Something went wrong, could not update User.',
            500
        );
        return next(error);
    }

    res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    let user;
    try {
        user = await userSchema.findById(userId);
    } catch (err) {
        const error = new httpError(
            'Something went wrong, could not delete user.',
            500
        );
        return next(error);
    }

    try {
        await user.remove();
    } catch (err) {
        const error = new httpError(
            'Something went wrong, could not delete user.',
            500
        );
        return next(error);
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