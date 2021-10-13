const mongoose = require('mongoose')

const newSubscriberSchema = mongoose.Schema({
    LastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    accountNum: {
        type: Number
    },
    bank: {
        type: Number
    },
    snif: {
        type: Number
    },
    tel: {
        type: Number
    }

})


module.exports = mongoose.model('NewSubscriber', newSubscriberSchema)


