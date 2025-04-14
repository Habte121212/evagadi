const mysql2 = require('mysql2')

const connection = mysql2.createPool({
  user: 'evagadi-admin',
  database: 'evagadi-db',
  host: 'localhost',
  password: 'Ha1435691$$',
  connectionLimit: 10,
})

connection.execute("SELECT 'test'  ", (err, results) => {
  if (err) {
    console.error('error: ', err.message)
  } else {
    console.log(results)
  }

  connection.end()
})
