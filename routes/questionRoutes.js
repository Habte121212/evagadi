const express = require('express')
const router = express.Router()

// post a new question
router.post('/ask', (req, res) => {
  res.send('Question posted successfully!')
})

// get all questions
router.get('/all', (req, res) => {
  res.send('Here are all the questions!')
})

// get a single question by id
router.get('/:id', (req, res) => {
  const questionId = req.params.id
  res.send(`Here is the question with id: ${questionId}`)
})

module.exports = router
