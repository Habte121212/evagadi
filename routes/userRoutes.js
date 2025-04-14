const express = require('express')
const router = express.Router()
// imported 
const{register, login, checkUser} = require('../../evagadi/controller/userController')

// register route
router.post('/register', register)

// login user
router.post('/login', login)

// check user
router.get('/check', checkUser)

module.exports = router 
