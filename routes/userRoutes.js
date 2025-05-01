const express = require('express')
const router = express.Router()
// authentication middleware
const authoMiddleware = require('../middleware/authoMiddleware')

const {
  register,
  login,
  checkUser,
} = require('../../evagadi/controller/userController')

// public
router.post('/register', register)
router.post('/login', login)
// protected
router.get('/check', authoMiddleware, checkUser)

module.exports = router
