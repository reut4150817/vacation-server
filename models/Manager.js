const mongoose = require('mongoose')

const managerSchema = mongoose.Schema({

    userName: {
        type: String,
        // unique: true,
        required: true

    },
    id: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordEmail: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Manager', managerSchema)


