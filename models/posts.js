const mongoose = require('mongoose')

const Posts = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    count: {
        type: Number
    },
    url: {
        type: String
    },
    metaDesc: {
        type: String
    },
    authorProfile: {
        type: String
    },
    EditedAt: {
        type: Date,
        default: Date.now
    },
}, {
    minimize: false
})


module.exports = mongoose.model('Posts', Posts, 'Posts')