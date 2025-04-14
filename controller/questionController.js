function postQuestions(req, res) {
  res.send('Question posted successfully!')
}
function getAll(req, res) {
  res.send('Here are all the questions!')
}
function getSingle(req, res) {
  const questionId = req.params.id
  res.send(`Here is the question with id: ${questionId}`)
}

module.exports ={postQuestions, getAll, getSingle}