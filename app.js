require('dotenv').config()

const express = require('express')
const app = express()
const port = 5500
// imported
const connection = require('./db/dbconfig')
//json middleware
app.use(express.json())

// user route middleware
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

// question route middleware
const questionRoutes = require('./routes/questionRoutes')
app.use('/api/questions', questionRoutes)

// answer route middleware
const answerRoutes = require('./routes/answerRoutes')
app.use('/api/answers', answerRoutes)

// async function start() {
//   try {
//     const result = await connection.execute("select 'test' ")
//     console.log(result)
//   } catch (error) {
//     console.log(error.message)
//   }
// }
// start();

app.listen(port, (err) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log(`listening on ${port}`)
  }
})
