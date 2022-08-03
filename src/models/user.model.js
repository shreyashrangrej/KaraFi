const mongoose = require("mongoose");

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
    }
})

const userSchema = new mongoose.model('userSchema', userModel)

module.exports = userSchema;
