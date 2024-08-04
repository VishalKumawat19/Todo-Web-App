const { createTodo, getTodo, editTodo, deleteTodo, getOneTodo } = require('../controllers/todoController')
const express = require('express')
const router = express.Router()
const authenticateUser = require('../middlewares/authenticateUser')


router.route('/').post(authenticateUser,createTodo)
router.route('/data/one/:todoId').get(authenticateUser,getOneTodo)
router.route('/data').get(authenticateUser,getTodo)
router.route('/data/:todoId').delete(authenticateUser,deleteTodo)
router.route('/data/:todoId').put(authenticateUser,editTodo)
module.exports=router