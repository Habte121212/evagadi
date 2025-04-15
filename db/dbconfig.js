const mysql2 = require('mysql2')

const connection = mysql2.createPool({
  user: process.env.USER,
  database:  process.env.DATABASE,
  host: 'localhost',
  password:  process.env.PASSWORD,
  connectionLimit: 10,
})

// connection.execute("SELECT 'test'  ", (err, results) => {
//   if (err) {
//     console.error('error: ', err.message)
//   } else {
//     console.log(results)
//   }

//   connection.end()
// })
module.exports= connection.promise()