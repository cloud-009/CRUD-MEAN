const mongoose = require('mongoose');

let Book = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    }
}, {
    collection: 'books'
})

module.exports = mongoose.model('Book', Book);