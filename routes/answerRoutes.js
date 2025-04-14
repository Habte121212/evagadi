const express = require('express')
const router = express.Router()
// imported
const {postAnswer,getAll, getSingle} = require("../controller/answerController")
// post a new answer
router.post('/reply', postAnswer)

// get all answers for a question
router.get('/all/:questionId', getAll)

// get a single answer by id
router.get('/:id',getSingle)

module.exports = router
