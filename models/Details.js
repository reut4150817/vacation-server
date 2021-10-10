const mongoose = require('mongoose')

const detailsSchema = mongoose.Schema({
    name: [
        'ccc'
    ],
    detals: [
        'mmmmm', 'dddddddd'
    ]

    // name:{
    //     type:String
    // },
    // style:[
    //     {
    //         length:{
    //             type:Number
    //         }
    //     }
    // ]
    // FirstName: {
    //     type: String,
    //     // unique: true,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     // unique: true,
    //     required: true
    // },



})


module.exports = mongoose.model('Details', detailsSchema)


