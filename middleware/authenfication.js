const jwt = require('jsonwebtoken')

async function authoMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Authentication invalid' })
  }

  const token = authHeader.split(' ')[1]
  console.log(authHeader)
  console.log(token)

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { username, userid }
    next()
  } catch (error) {
    return res.status(401).json({ msg: 'Authentication invalid' })
  }
}

module.exports = authoMiddleware
