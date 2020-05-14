const mongoose = require('mongoose')

const Comments = new mongoose.Schema({
    postid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Comments', Comments, 'Comments')