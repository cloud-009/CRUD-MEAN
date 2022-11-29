const express = require('express');
const app = express();


const bookRoute = express.Router();
let Book = require('../Model/Book');

// Get all books
bookRoute.route('/').get((req, res) => {
    Book.find((err, data) => {
        if (err) return next(err);
        else res.json(data);
    })
});

// Get book by id 
bookRoute.route('/read-book/:id').get((req, res) => {
    Book.findById(req.params.id, (err, data) => {
        if (err) return next(err);
        else res.json(data);
    })
});

// Post new book
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (err, data) => {
        if (err) return next(err);
        else res.json(data);
    })
});

// Update the existing book 
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            console.log('Book updated successfully!')
            res.json(data)
        }
    })
})

// Delete the existing book 
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
            console.log('Deleted successfully');
        }
    })
})


module.exports = bookRoute;
