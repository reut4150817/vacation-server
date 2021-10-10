const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    // id: {
    //     type: Number
    // },
    LastName: {
        type: String,
        // unique: true,
        required: true
    },
    FirstName: {
        type: String,
        // unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // unique: true,
        required: true
    },



})


module.exports = mongoose.model('User', userSchema)


