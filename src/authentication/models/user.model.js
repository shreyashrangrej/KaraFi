const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },

    email: {
        type: String,
        required: true,
        minlength: 3,
    },

    password: {
        type: String,
        unique: true,
        required: true,
    },

    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "role"
        }
    ],

    userDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdetail'
    }
})

userModel.set('timestamps', true)

const Users = new mongoose.model('user', userModel)

module.exports = Users