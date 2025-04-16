require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 5500

const connection = require('./db/dbconfig')

// Global middleware
app.use(express.json())

// Route middlewares
const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const answerRoutes = require('./routes/answerRoutes')

app.use('/api/users', userRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/answers', answerRoutes)

// Optional: Test DB connection at startup
async function testDatabaseConnection() {
  try {
    const [result] = await connection.execute(
      "SELECT 'DB connected!' AS message",
    )
    console.log(result[0].message)
  } catch (error) {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  }
}

// Start server after DB test
app.listen(port, async () => {
  await testDatabaseConnection()
  console.log(`✅ Server running on http://localhost:${port}`)
})
