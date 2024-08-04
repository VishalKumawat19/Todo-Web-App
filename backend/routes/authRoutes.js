const express = require('express')
const router = express.Router()
// const authenticateUser = require('../middlewares/authenticateUser')
const {registerUser,loginUser,logoutUser} = require('../controllers/authController')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

module.exports = router

