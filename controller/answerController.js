function postAnswer(req, res) {
res.send('Answer posted successfully!')  
}
function getAll(req, res) {
  const questionId = req.params.questionId
  res.send(`Here are all answers for question id: ${questionId}`)
}
function getSingle(req, res) {
   const answerId = req.params.id
  res.send(`Here is the answer with id: ${answerId}`)
}
module.exports = {postAnswer, getAll, getSingle}