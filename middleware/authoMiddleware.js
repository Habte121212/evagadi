const jwt = require('jsonwebtoken')

async function authoMiddleware(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Authentication token missing or invalid' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { username: decoded.username, userid: decoded.userid }
    next()
  } catch (error) {
    console.error('JWT Verification Error:', error.message)
    return res.status(401).json({ msg: 'Invalid or expired token' })
  }
}

module.exports = authoMiddleware
