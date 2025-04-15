const connection = require('../db/dbconfig')
const bcrypt = require('bcrypt')

// imported json web token 
const jwt = require("jsonwebtoken")

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: 'Please provide all required information' })
  }
  if (password.length < 8) {
    return res.status(400).json({msg:'password must be at least 8 characters'})
  }

  try {
    const [user] = await connection.query('select username,userid from users where username= ? or email = ?', [username, email])
    if(user.length > 0 ){
      return res.status(400).json({msg:'user already registered'})
    }
    //encript
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const [result] = await connection.query(
      'INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)',
      [username, firstname, lastname, email, hashedPassword],
    )

    console.log('User inserted successfully:', result)
    return res.status(200).json({ msg: 'User registered successfully' })
  } catch (error) {
    console.error('FULL ERROR: ', error)
    return res
      .status(500)
      .json({ msg: 'Something went wrong, please try again' })
  }
}

async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide all required information' })
  }
  try {
    const [user] = await connection.query('select username, userid, password from users where email = ?', [email])
    if (user.length==0) {
      return res.status(400).json({msg:'user does not exist'})
      
    }
    //compare password
    const isMatch=await bcrypt.compare(password, user[0].password);
    if(!isMatch){
      return res.status(400).json({msg:'incorrect password'})
    }
   const username = user[0].username
   const userid = user[0].userid

    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.status(200).json({msg:'user login sucessful', token})
    
    
  } catch (error) {
     console.error('FULL ERROR: ', error)
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
    
  }
}

async function checkUser(req, res) {
  const username = req.user.username
  const userid = req.user.userid
  return res.status(200).json({ msg: 'valid user', username, userid })
}

module.exports = { register, login, checkUser }
