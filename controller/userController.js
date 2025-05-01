const connection = require('../db/dbconfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(req, res) {
  const { username, firstname, lastname, email, password, confirmPassword } =
    req.body

  // Validate that all fields are provided
  if (
    !username ||
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .json({ msg: 'Please provide all required information' })
  }

  // Check if password length is less than 8 characters
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'Password must be at least 8 characters long' })
  }

  // Validate if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' })
  }

  try {
    // Check if the username or email already exists
    const [user] = await connection.query(
      'SELECT username, userid FROM users WHERE username = ? OR email = ?',
      [username, email],
    )
    if (user.length > 0) {
      return res.status(400).json({ msg: 'User already registered' })
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Insert the new user into the database
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
      .json({ msg: 'Something went wrong, please try again later' })
  }
}

async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: 'Please provide all required information' })
  }

  try {
    const [user] = await connection.query(
      'SELECT username, userid, password FROM users WHERE email = ?',
      [email],
    )
    if (user.length === 0) {
      return res.status(400).json({ msg: 'User does not exist' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user[0].password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' })
    }

    const username = user[0].username
    const userid = user[0].userid

    // Create a JWT token
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })

    // Set the token in the cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    })

    return res.status(200).json({ msg: 'User login successful' })
  } catch (error) {
    console.error('FULL ERROR: ', error)
    return res
      .status(500)
      .json({ msg: 'Something went wrong, please try again later' })
  }
}

async function checkUser(req, res) {
  const username = req.user.username
  const userid = req.user.userid
  return res.status(200).json({ msg: 'Valid user', username, userid })
}

module.exports = { register, login, checkUser }
