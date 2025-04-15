const express = require('express')
const router = express.Router()
//authonthication middleware
const authoMiddleware = require('../middleware/authenfication')

const {
  register,
  login,
  checkUser,
} = require('../../evagadi/controller/userController')

//public
router.post('/register', register)
router.post('/login', login)
//protect 
router.get('/check',authoMiddleware ,checkUser)

module.exports = router
