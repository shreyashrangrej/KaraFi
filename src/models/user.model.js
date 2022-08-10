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
    },

    gender: {
        type: String,
        required: true,
    },

    dateOfBirth: {
        type: Date,
        required: true
    },
    
    phoneNumber: {
        type: String,
        require: true,
    }
})

userModel.set("timestamps", true);

const Users = new mongoose.model('Users', userModel)

module.exports = Users;
