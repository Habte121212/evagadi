const jwt = require('jsonwebtoken')

async function authoMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ msg: 'Authentication token missing or invalid' })
  }

  const token = authHeader.split(' ')[1]

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
