const express = require('express')
const router = express.Router()
//imported
const {postQuestions, getAll , getSingle} = require('../controller/questionController')

// post a new question
router.post('/ask', postQuestions)

// get all questions
router.get('/all', getAll )

// get a single question by id
router.get('/:id', getSingle)

module.exports = router
