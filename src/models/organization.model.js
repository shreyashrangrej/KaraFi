const mongoose = require('mongoose')
const schema = mongoose.Schema({
    organizationId: {
        type: String,
        unique: true
    },
    organizationName: {
        type: String
    },
    organizationDescription: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    zipCode: {
        type: String
    },
    addressLine1: {
        type: String
    },
    addressLine2: {
        type: String
    },
    type: {
        type: String
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        }
    ],
})
schema.set('timestamps', true)
const organization = new mongoose.model('organization', schema)
module.exports = organization