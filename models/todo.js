const mongoose = require('mongoose');


// todo 
const todoSchema = new mongoose.Schema({
    Task_ID: {type : Number, required : true, unique : true},
    User_ID: {type : Number, required : true},
    Task_Name : { type : String, required : true},
    isCompleted : {type : Boolean, default : false},
    Priority : {type : Number , required : true}, // 0 and 1 
    Urgency : { type : Number, required : true}, // 0 and 1
})


// create model
const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;