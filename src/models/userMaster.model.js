const mongoose = require('mongoose')
const userMasterModel = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    phoneNumber: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
    nationality: {
        type: String,
    },
    birthPlace: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
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
    }
})
userMasterModel.set('timestamps', true)
const UserMaster = new mongoose.model('userMaster', userMasterModel)
module.exports = UserMaster