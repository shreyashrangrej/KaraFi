const { validationResult } = require('express-validator')
const userSchema = require('../models/userMaster.model')
const {
    uploadToCloudinary,
    removeFromCloudinary,
} = require('../util/cloudinary')
const getUser = async (req, res, next) => {
    try {
        const user = await userSchema.find()
        res.status(200).send({ users: user })
    } catch (err) {
        return res.status(404).json({ Error: "Something went wrong, could not find users." })
    }
}
const getUserByEmail = async (req, res, next) => {
    const email = req.params.id;
    let user;
    try {
        user = await userSchema.findOne({ email: email })
    } catch (err) {
        res.status(404).json({ Error: 'Something went wrong, could not find user: ' + email })
        return next();
    }
    if (!user) {
        return res.status(404).json({ Error: 'Could not find the user for provided email: ' + email })
    }
    res.status(200).json({ user: user })
}
const createUser = async (req, res, next) => {
    const { firstName, lastName, email, gender, dateOfBirth, phoneNumber, jobTitle, nationality, birthPlace } = req.body
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
    })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            })
        }
        try {
            await createdUser.save()
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Something went wrong please try again or check logs.' })
            return next()
        }
    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ Error: err.message })
        } else {
            res.status(500).json({ Error: 'Creating User failed, please try again or check logs.' })
        }
        return next()
    }
    res.status(200).json({ user: createdUser })
}
const updateUser = async (req, res, next) => {
    const { firstName, lastName, email, gender, dateOfBirth, phoneNumber, jobTitle, nationality, birthPlace } = req.body
    const emailId = req.params.id
    let user;
    try {
        user = await userSchema.findOne({ email: emailId })
    } catch (err) {
        res.status(500).json({ Error: 'Could not find the user for provided ID: ' + emailId })
        return next()
    }
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.gender = gender
    user.dateOfBirth = dateOfBirth
    user.phoneNumber = phoneNumber
    user.jobTitle = jobTitle
    user.nationality = nationality
    user.birthPlace = birthPlace
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            })
        }
        await user.save();
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Updating User failed, please try again or check logs." })
        return next();
    }
    res.status(200).json({ user: user })
}
const deleteUser = async (req, res, next) => {
    const email = req.params.id
    let user
    try {
        user = await userSchema.findOne({ email: email })
    } catch (err) {
        res.status(404).json({ error: "Cannot find user with provided Email:" + email })
        return next()
    }
    try {
        await user.remove()
    } catch (err) {
        res.status(500).json({ error: "Something went wrong, could not delete user:" + email })
        return next()
    }
    res.status(200).json({ deletedUser: user })
}
const getUserPopulate = async (req, res, next) => {
    const email = req.params.id;
    const populateField = req.params.fields.split(",")
    let user;
    try {
        user = await userSchema.findOne({ email: email }).populate(populateField)
    } catch (err) {
        res.status(404).json({ Error: "Something went wrong, could not find Email: " + email })
        return next()
    }
    if (!user) {
        return res.status(404).json({ Error: "Could not find the user for provided Email: " + email });
    }
    res.status(200).json({ user: user });
}
const createUserImage = async (req, res, next) => {
    const email = req.params.id
    let user
    let data
    try {
        user = await userSchema.findOne({ email: email })
        if (user) {
            try {
                if (user.publicId) {
                    const publicId = user.publicId
                    await removeFromCloudinary(publicId)
                }
                data = await uploadToCloudinary(req.file.path, 'user-images')
                user.imageUrl = data.url;
                user.publicId = data.public_id
                await user.save()
            } catch (error) {
                res.status(422).json({ Error: "Could not upload image to cloudinary." })
                return next()
            }
        } else {
            res.status(422).json({ Error: "Could not find the user for provided Email: " + email })
        }
    } catch (error) {
        res.status(422).json({ Error: "Could not find the user for provided Email: " + email })
        return next()
    }
    res.status(200).json({ user: user })
}
const deleteUserImage = async (req, res, next) => {
    try {
        const user = await userSchema.findOne({ email: req.params.id })
        const publicId = user.publicId;
        await removeFromCloudinary(publicId);
        await userSchema.updateOne(
            { email: req.params.id },
            {
                $set: {
                    imageUrl: "",
                    publicId: "",
                },
            }
        )
        res.status(200).send('User image deleted with success!')
    } catch (error) {
        console.log(error)
        res.status(404).json({ Error: "Could not delete image. Please check logs for details." })
        return next();
    }
}
module.exports = {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    getUserPopulate,
    createUserImage,
    deleteUserImage
}