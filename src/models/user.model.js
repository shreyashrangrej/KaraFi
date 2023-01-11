const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        unique: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date,
    },
    userMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermasters"
    }
})
userModel.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
})
userModel.methods.comparePassword = async function (candidatePassword, next) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};
userModel.set('timestamps', true)
const User = mongoose.model('user', userModel)
module.exports = User