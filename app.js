const express = require('express')
const app = express();    
const port = 5500;

// user route middleware
const userRoutes = require("./routes/userRoutes")
app.use('/api/users', userRoutes)

//questions route middleware
const questioRoutes = require("./routes/questionRoutes")
app.use('./api/users', questioRoutes)

// answer route middleware
const answerRoutes = require('./routes/answerRoutes')
app.use('./api/users', answerRoutes)

app.listen(port, (err)=>{
  if(err){
    console.log(err.message);
  }else{
    console.log(`listening on ${port}`)
  }
})