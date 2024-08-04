const mongoose = require('mongoose')
const User = require('./userModel')

const todoSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const Todo = mongoose.model("Todo",todoSchema)
module.exports = Todo