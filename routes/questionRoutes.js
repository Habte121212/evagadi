const express = require('express')
const router = express.Router()

// Authentication middleware
const authoMiddleware = require('../middleware/authoMiddleware')

// Imported controller functions
const {
  postQuestions,
  getAll,
  getSingle,
} = require('../controller/questionController')

// Public routes
router.get('/all', getAll) // get all questions
router.get('/:id', getSingle) // get a single question by id

// Protected routes
router.post('/ask', authoMiddleware, postQuestions) // post a new question (requires login)

module.exports = router
