const mongoose = require('mongoose')

const userModel = mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }

});

userModel.set('timestamps', true)

const Users = new mongoose.model('user', userModel)

module.exports = Users;

