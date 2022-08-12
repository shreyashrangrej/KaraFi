const mongoose = require("mongoose")

const addressModel = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: true
    },

    addressLine2: {
        type: String,
    },

    country: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    district: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    zipCode: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

addressModel.set("timestamps", true);

const Address = new mongoose.model('Address', addressModel)

module.exports = Address;