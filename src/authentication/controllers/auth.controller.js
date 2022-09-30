const { validationResult } = require('express-validator')
const config = require('../config/auth.config')
const db = require('../models')

const User = db.user;
const Role = db.role;

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            });
        }
        await user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return next();
            }
            if (req.body.roles) {
                Role.find(
                    {
                        roleName: { $in: req.body.roles }
                    },
                    (err, roles) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return next();
                        }
                        user.roles = roles.map(role => role._id);
                        user.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return next();
                            }
                            res.send({ message: "User was registered successfully!" });
                        });
                    }
                );
            } else {
                Role.findOne({ roleName: "user" }, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return next();
                    }
                    user.roles = [role._id];
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return next();
                        }
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            }
        });
    } catch (error) {
        res.status(500).json({ Error: "Something went wrong pleas try again." });
        return next();
    }
}

const login = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            });
        }

        await User.findOne({
            username: req.body.username
        })
            .populate("roles", "-__v")
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return next();
                }
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400
                });
                var authorities = [];
                for (let i = 0; i < user.roles.length; i++) {
                    authorities.push("ROLE_" + user.roles[i].roleName.toUpperCase());
                }
                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
    } catch (error) {
        res.status(500).json({ Error: "Something went wrong pleas try again." });
        return next();
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find()
        res.status(200).send({ users: user })
    } catch (err) {
        return res.status(404).json({ Error: "Something went wrong, could not find users." });
    }
}

const updateUser = async (req, res, next) => {
    const userId = req.params.id
    let authUser

    try {
        authUser = await User.findById(userId)
    } catch (error) {
        console.log(error)
        res.status(404).json({ Error: 'Could not find the user for provided ID: ' + userId })
        return next()
    }

    try {
        await authUser.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return next();
            }
            if (req.body.roles) {
                Role.find(
                    {
                        roleName: { $in: req.body.roles }
                    },
                    (err, roles) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return next();
                        }
                        user.roles = roles.map(role => role._id);
                        user.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return next();
                            }
                            res.send({ authUser: authUser });
                        });
                    }
                );
            } else {
                Role.findOne({ roleName: "user" }, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return next();
                    }
                    user.roles = [role._id];
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return next();
                        }
                        res.send({ authUser: authUser });
                    });
                });
            }
        });
    } catch(error) {
        console.log(error)
        res.status(500).json({ Error: "Something went wrong pleas try again, or check logs." });
        return next();
    }
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.id

    let authUser
    try {
        authUser = await User.findById(userId);
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: 'Cannot find user with provided Id:' + userId });
        return next();
    }

    try {
        await authUser.remove();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong, could not delete User:' + userId });
        return next();
    }
    res.status(200).json({ deletedUser: authUser });
}

module.exports = {
    signup,
    login,
    getAllUsers,
    updateUser,
    deleteUser
}