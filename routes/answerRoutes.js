const express = require('express')
const router = express.Router()

// post a new answer
router.post('/reply', (req, res) => {
  res.send('Answer posted successfully!')
})

// get all answers for a question
router.get('/all/:questionId', (req, res) => {
  const questionId = req.params.questionId
  res.send(`Here are all answers for question id: ${questionId}`)
})

// get a single answer by id
router.get('/:id', (req, res) => {
  const answerId = req.params.id
  res.send(`Here is the answer with id: ${answerId}`)
})

module.exports = router
