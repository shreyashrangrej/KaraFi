const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        unique: true
    },
    projectTitle: {
        type: String
    },
    projectDescription: {
        type: String
    },
    startDate: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'status'
    },
    priority: {
        type: String
    },
    priorityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'priorities'
    },
    numberOfTasks: {
        type: String
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'departments'
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizations'
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tasks'
        }
    ],
    subTasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subtasks'
        }
    ],
    projectCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermaster'
    },
    projectOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usermaster'
        }
    ]
})
projectSchema.set('timestamps', true)
const project = new mongoose.model('project', projectSchema)
module.exports = project