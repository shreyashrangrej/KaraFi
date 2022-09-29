const { validationResult } = require('express-validator')
const userSchema = require('../models/userDetail.model');
const authUser = require('../authentication/models/user.model')

const {
    uploadToCloudinary,
    removeFromCloudinary,
} = require('../util/cloudinary')

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
    res.json({ user: user });
};

const createUser = async (req, res, next) => {
    const { firstName, lastName, email, gender, dateOfBirth, phoneNumber, jobTitle, nationality, birthPlace ,user } = req.body;
    const createdUser = new userSchema({
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth,
        phoneNumber,
        jobTitle,
        nationality,
        birthPlace,
        user
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
            const findAuthUser = await authUser.findById(user)
            if (!findAuthUser) {
                return res.status(404).json({ error: 'Could not find user for provided user ID: ' + user })
            }
            findAuthUser.userDetail = createdUser.id;
            await createdUser.save()
            await findAuthUser.save()
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Something went wrong please try again or check logs.' })
            return next()
        }
    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ Error: err.message });
        } else {
            res.status(500).json({ Error: 'Creating User failed, please try again.' });
        }
        return next();
    }
    res.status(200).json({ user: createdUser });
};

const updateUser = async (req, res, next) => {
    const { firstName, lastName, email, gender, dateOfBirth, phoneNumber, jobTitle, nationality, birthPlace } = req.body;
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
    user.jobTitle = jobTitle;
    user.nationality = nationality;
    user.birthPlace = birthPlace;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            });
        }
        await user.save();
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Updating User failed, please try again or check logs." });
        return next();
    }
    res.status(200).json({ user: user });
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
    res.status(200).json({ deletedUser: user });
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
    res.status(200).json({ user: user });
};

const createUserImage = async (req, res, next) => {
    const userId = req.params.id;
    let user
    let data
    try {
        user = await userSchema.findById(userId);
        if (user) {
            try {
                if(user.publicId){
                    const publicId = user.publicId;
                    await removeFromCloudinary(publicId);
                }
                data = await uploadToCloudinary(req.file.path, 'user-images')
                user.imageUrl = data.url;
                user.publicId = data.public_id;
                await user.save()
            } catch (error) {
                res.status(422).json({ Error: "Could not upload image to cloudinary." });
                return next();
            }
        } else {
            res.status(422).json({ Error: "Could not find the user for provided ID: " + userId });
        }
    } catch (error) {
        res.status(422).json({ Error: "Could not find the user for provided ID: " + userId });
        return next();
    }
    res.status(200).json({ user: user });
};

const deleteUserImage = async (req, res, next) => {
    try {
        const user = await userSchema.findOne({ _id: req.params.id });
        const publicId = user.publicId;
        await removeFromCloudinary(publicId);
        await userSchema.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    imageUrl: "",
                    publicId: "",
                },
            }
        );
        res.status(200).send('User image deleted with success!');
    } catch (error) {
        console.log(error)
        res.status(404).json({ Error: "Could not delete image. Please check logs for details." })
        return next();
    }
};

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserPopulate,
    createUserImage,
    deleteUserImage
};