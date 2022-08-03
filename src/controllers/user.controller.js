const { validationResult } = require('express-validator');

const httpError = require('../models/httpError');
const userSchema = require('../models/user.model');


const getUser = async (req, res, next) => {
    res.json({ message: "GET all Users" });
};

const getUserById = async (req, res, next) => {
    const userId = req.params.pid;
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
    res.json({ user: user.toObject({ getters: true }) }); // => { place } => { place: place }
};

const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new httpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { firstName, lastName } = req.body;
    const createdUser = new userSchema({
        firstName,
        lastName
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

const updateUser = (req, res, next) => {
    res.json({ message: "GET 1 tea" });
};

const deleteUser = (req, res, next) => {
    res.json({ message: "POST 1 tea comment" });
};

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};