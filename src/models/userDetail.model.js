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

    jobTitle: {
        type: String,
        require: true,
    },

    nationality: {
        type: String,
    },

    birthPlace: {
        type: String,
    },

    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },

    publicId: {
        type: String
    },

    imageUrl: {
        type: String,
        required: false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    
})

userDetailModel.set('timestamps', true)

const UserDetail = new mongoose.model('userdetail', userDetailModel)

module.exports = UserDetail;
