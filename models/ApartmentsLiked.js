const mongoose = require('mongoose')

const apartmentsLikedSchema = mongoose.Schema({
    nameCurrentUser: {
        type: String,
        required: true
    },
    passwordCurrentUser: {
        type: String,
        required: true
    },
    nameUser: {
        type: String,
        required: true
    },
    passwordUser: {
        type: String,
        required: true
    },
    telUser: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    floor: {
        type: Number
    },
    numRooms: {
        type: Number
    },
    numBeds: {
        type: Number
    },
    regularWeekMidPrice: {
        type: Number
    },
    regularWeekEndPrice: {
        type: Number
    },
    seasonWeekMidPrice: {
        type: Number
    },
    seasonWeekEndPrice: {
        type: Number
    },
    defaultPrice: {
        type: Number
    },
    extraPrice: {
        type: Number
    },
    remark: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('ApartmentsLiked', apartmentsLikedSchema)