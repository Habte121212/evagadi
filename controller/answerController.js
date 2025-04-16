const connection = require('../db/dbconfig')

// Post a new answer
async function postAnswer(req, res) {
  const { questionId, description } = req.body
  const { userid } = req.user // User ID from auth middleware

  if (!questionId || !description) {
    return res
      .status(400)
      .json({ msg: 'Please provide both questionId and answer description' })
  }

  try {
    // Check if the question exists
    const [question] = await connection.query(
      'SELECT * FROM questions WHERE questionid = ?',
      [questionId],
    )

    if (question.length === 0) {
      return res.status(404).json({ msg: 'Question not found' })
    }

    // Insert the answer into the answers table
    const [result] = await connection.query(
      'INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)',
      [questionId, userid, description],
    )

    return res.status(200).json({
      msg: 'Answer posted successfully!',
      answerid: result.insertId,
    })
  } catch (error) {
    console.error('FULL ERROR:', error)
    return res.status(500).json({
      msg: 'Something went wrong, please try again',
      error: error.message,
    })
  }
}

// Get all answers for a question
async function getAll(req, res) {
  const { questionId } = req.params

  try {
    const [answers] = await connection.query(
      'SELECT * FROM answers WHERE questionid = ? ORDER BY created_at DESC',
      [questionId],
    )

    if (answers.length === 0) {
      return res.status(404).json({ msg: 'No answers found for this question' })
    }

    return res.status(200).json(answers)
  } catch (error) {
    console.error('FULL ERROR:', error)
    return res.status(500).json({
      msg: 'Something went wrong, please try again',
      error: error.message,
    })
  }
}

// Get a single answer by ID
async function getSingle(req, res) {
  const { id: answerId } = req.params

  try {
    const [answer] = await connection.query(
      'SELECT * FROM answers WHERE answerid = ?',
      [answerId],
    )

    if (answer.length === 0) {
      return res.status(404).json({ msg: 'Answer not found' })
    }

    return res.status(200).json(answer[0])
  } catch (error) {
    console.error('FULL ERROR:', error)
    return res.status(500).json({
      msg: 'Something went wrong, please try again',
      error: error.message,
    })
  }
}

module.exports = { postAnswer, getAll, getSingle }
