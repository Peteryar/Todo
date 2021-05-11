const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
    title:{
        type:String,
        minLength:2,
        maxLength:200,
        required:true
    },
    status:{
        type:String,
        default:"pending",
    },
    createdDate:{
        type:Date,
        default:Date.now
    }
})

const SubTask = mongoose.model("Subtask", subTaskSchema);

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        minLength:2,
        maxLength:200,
        required:true
    },
    status:{
        type:String,
        default:"pending",
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    subtasks:[subTaskSchema]
})

const Todo = mongoose.model("Task", todoSchema);

module.exports = {Todo, SubTask}