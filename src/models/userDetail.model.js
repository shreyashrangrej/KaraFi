const mongoose = require('mongoose')

const userDetailModel = new mongoose.Schema({
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
    },

    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    
})

userDetailModel.set('timestamps', true)

const UserDetail = new mongoose.model('userdetail', userDetailModel)

module.exports = UserDetail;
