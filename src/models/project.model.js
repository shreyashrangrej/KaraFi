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

    endDate: {
        type: Date
    },

    projectOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdetail'
    },

    projectMember: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userdetail'
        }
    ]
})

projectSchema.set('timestamps', true)

const project = new mongoose.model('project', projectSchema)

module.exports = project