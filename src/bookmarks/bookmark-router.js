const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')
const { bookmarks } = require('../store')

const bookmarkRouter = express.Router()
const bodyParser = express.json()

// route for all bookmarks 
bookmarkRouter
    .route('/bookmarks')
    // display all bookmarks
    .get((req, res) => {
        res.json(bookmarks)
    })
    // create a bookmark
    .post(bodyParser, (req, res) => {
        for (const field of ['title', 'url', 'rating']) {
            if (!req.body[field]) {
                logger.error(`${feild} is required`)
                return res.status(400).send(`${feild} is required`)
            }
            const { title, url, description, rating } = req.body

            if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
                logger.error(`Invalid rating '${rating}' supplied`)
                return res.status(400).send(`'rating' must be a number between 0 and 5`)
            }

            const id = uuid()
            const bookmark = { id, title, url, description, rating }

            bookmarks.push(bookmark)
            logger.info(`Card with id ${id} created`)

            res
                .status(201)
                .location(`http://localhost:8040/card/${id}`)
                .json(bookmark)
        }
    })

// route for a specific bookmark
bookmarkRouter
    .route('/bookmarks/:id')
    .get()
    .delete()