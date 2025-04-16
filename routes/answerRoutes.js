const express = require('express')
const router = express.Router()

const {
  postAnswer,
  getAll,
  getSingle,
} = require('../controller/answerController')

const authoMiddleware = require('../middleware/authoMiddleware')

// Post a new answer - Requires authentication
router.post('/reply', authoMiddleware, postAnswer)

// Get all answers for a specific question
router.get('/all/:questionId', getAll)

// Get a single answer by ID
router.get('/:id', getSingle)

module.exports = router
