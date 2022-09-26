const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
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
})

projectSchema.set('timestamps', true)

const project = new mongoose.model('project', projectSchema)

module.exports = project