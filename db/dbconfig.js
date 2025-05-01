const mysql2 = require('mysql2')
require('dotenv').config()

const connection = mysql2.createPool({
  host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 8889,
  connectionLimit: 10,
})

connection.getConnection((err, conn) => {
  if (err) {
    console.error('❌ Database connection failed:')
    console.error(err) // 👉 show full error object
    return
  }
  console.log('✅ Database connected successfully')
  conn.release() // release the connection
})

module.exports = connection.promise()

// const mysql2 = require('mysql2')

// const connection = mysql2.createPool({
//   user: process.env.USER,
//   database: process.env.DATABASE,
//   host: 'localhost',
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
//   connectionLimit: 10,
// })

// connection.execute("SELECT 'test'  ", (err, results) => {
//   if (err) {
//     console.error('error: ', err.message)
//   } else {
//     console.log(results)
//   }

//   connection.end()
// })

// module.exports = connection.promise()
