const Todo = require("../models/todoModel");
const User = require("../models/userModel");

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user;
  console.log(userId)
  try {
    if (!userId || !title || !description) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const newTodo = new Todo({
      userId,
      title,
      description,
    });

    const createdTodo = await newTodo.save();
    res.status(201).json({
      message: "Todo created successfully",
      createTodo,
    });
  } catch (error) {
    console.log("failed to create to do", error);
    res.status(500).json({ message: "failed to create todo" });
  }
};

const getTodo = async (req, res) => {
  const userId  = req.user;
  try {
    const todos = await Todo.find({ userId });
    res.status(200).json({
      todos,
    })
    }
   
  catch (error) {
    console.log("failed to get todo", error);
    res.status(500).json({
      message: "failed to get todo",
    });
  }
};

const getOneTodo = async (req, res) => {
  const userId  = req.user;
  const _id = req.params.todoId;
  try {
    const todos = await Todo.findOne({_id,userId});
    res.status(200).json({
      todos
    })
    }
   
  catch (error) {
    console.log("failed to get todo", error);
    res.status(500).json({
      message: "failed to get todo",
    });
  }
};

const editTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.user;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    // const authenticate = await Todo.find({ userId: { $in: userId } });
    if (!todo.userId.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this todo" });
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    await Todo.findByIdAndUpdate(
      todoId,
      { title: title, description: description },
      { runValidators: true }
    );
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log("error in updating todo", error);
    res.status(500).json({ message: "failed to update todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.user;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    // const authenticate = await Todo.find({ userId: { $in: userId } });
    if (!todo.userId.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this todo" });
    }

    await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("error in deleting todo", error);
    res.status(500).json({ message: "failed to delete todo" });
  }
};

module.exports = { createTodo, getTodo, editTodo, deleteTodo,getOneTodo};
