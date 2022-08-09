const mongoose = require("mongoose")
const validator = require("validator")

const userModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, 'Invalid Email!']
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
})

userModel.set("timestamps", true);

const Users = new mongoose.model('Users', userModel)

module.exports = Users;
