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
        validate: [ validator.isEmail, 'Invalid Email!']
    }
})

userModel.set("timestamps", true);

const Users = new mongoose.model('Users', userModel)

module.exports = Users;
