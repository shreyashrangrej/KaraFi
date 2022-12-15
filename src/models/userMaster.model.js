const mongoose = require('mongoose')
const userMasterModel = new mongoose.Schema({
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
    createdProject: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project'
        }
    ],
    ownerOfProject: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project'
        }
    ],
    createdTask: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tasks'
        }
    ],
    taskOfOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tasks'
        }
    ],
    createdSubTask: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subtasks'
        }
    ],
    ownerOfSubTasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subtasks'
        }
    ],
    departmentAsHead: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'departments'
        }
    ],
    departmentAsMember: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'departments'
        }
    ],
    publicId: {
        type: String
    },
    imageUrl: {
        type: String,
        required: false
    }
})
userMasterModel.set('timestamps', true)
const UserMaster = new mongoose.model('userMaster', userMasterModel)
module.exports = UserMaster