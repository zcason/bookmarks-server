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
            logger.info(`Bookmark with id ${id} created`)

            res
                .status(201)
                .location(`http://localhost:8040/bookmarks/${id}`)
                .json(bookmark)
        }
    })

// route for a specific bookmark
bookmarkRouter
    .route('/bookmarks/:id')
    // display specific bookmark by id 
    .get((req, res) => {
        const { id } = req.params
        const bookmark = bookmarks.find(bm => bm.id === id)

        // make sure the bookmark was found
        if (!bookmark) {
            logger.error(`Bookmark with id ${id} not found.`)
            return res
                .status(404)
                .send('Bookmark Not Found')
        }

        res.json(bookmark)
    })
    // delete specific bookmark
    .delete((req, res) => {
        const { id } = req.params

        const bookmarkIndex = bookmarks.findIndex(bm => bm.id === id)

        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found.`)
            return res
                .status(404)
                .send('Not found')
        }

        //remove card from lists
        //assume cardIds are not duplicated in the cardIds array
        lists.forEach(list => {
            const bookmarkIds = bookmarks.filter(bmId => bmId !== id)
            bookmarks = bookmarkIds
        })

        bookmarks.splice(bookmarkIndex, 1)

        logger.info(`Bookmark with id ${id} deleted.`)

        res
            .status(204)
            .end()
    })


module.exports = bookmarkRouter