const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectId: {
        type: String
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

    priority: {
        type: String
    },

    numberOfTasks: {
        type: String
    },

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