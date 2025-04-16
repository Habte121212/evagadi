const connection = require('../db/dbconfig')

// Post a new question
async function postQuestions(req, res) {
  const { title, body } = req.body
  const userid = req.user.userid

  if (!title || !body) {
    return res.status(400).json({ msg: 'Please provide both title and body' })
  }

  try {
    const [result] = await connection.query(
      'INSERT INTO questions (title, description, userid) VALUES (?, ?, ?)',
      [title, body, userid],
    )
    console.log('Question posted:', result)
    return res
      .status(200)
      .json({
        msg: 'Question posted successfully!',
        questionid: result.insertId,
      })
  } catch (error) {
    console.error('FULL ERROR:', error)
    return res
      .status(500)
      .json({ msg: 'Something went wrong, please try again' })
  }
}

// Get all questions
async function getAll(req, res) {
  try {
    const [questions] = await connection.query(
      'SELECT * FROM questions ORDER BY created_at DESC',
    )
    return res.status(200).json(questions)
  } catch (error) {
    console.error('FULL ERROR:', error)
    return res
      .status(500)
      .json({ msg: 'Something went wrong, please try again' })
  }
}

// Get a single question by ID
async function getSingle(req, res) {
  const questionId = req.params.id

  try {
    const [question] = await connection.query(
      'SELECT * FROM questions WHERE questionid = ?',
      [questionId],
    )

    if (question.length === 0) {
      return res.status(404).json({ msg: 'Question not found' })
    }

    return res.status(200).json(question[0])
  } catch (error) {
    console.error('FULL ERROR:', error)
    return res
      .status(500)
      .json({ msg: 'Something went wrong, please try again' })
  }
}

module.exports = { postQuestions, getAll, getSingle }
