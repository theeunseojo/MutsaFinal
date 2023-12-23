// modules
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');


// server
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// mondoDB
mongoose.connect('mongodb+srv://ces803:xXBXyt1PRRjg1taX@cluster0.nqlbm4t.mongodb.net/');


app.get('/',(req,res)=>{
  res.send('hello world!');
})
// API endpoint Todo

// get todos
app.get('/api/todos', async(req,res) => {
  try{
    const todos = await Todo.find();
    res.json(todos);

  } catch(error){
    res.status(500).json({error : 'Internal Server Error'});
  }
});

// add new todo 
app.post('/api/todos', async (req, res) => {
  try {
    const { Task_ID, User_ID, Task_Name, isCompleted, Priority, Urgency } = req.body;
    const newTodo = new Todo({ Task_ID, User_ID, Task_Name, isCompleted, Priority, Urgency });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// update todo 
app.put('/api/todos/:Task_ID', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.Task_ID, req.body, {new: true});
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// delete todo 
app.delete('/api/todos/:Task_ID', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.Task_ID);
    res.status(200).json({message: 'Todo deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// routes
app.get('*',function(req,res){
  res.status(404).send('Invalid Page')
})

// start the server

app.listen(port, ()=>{
  console.log("server....")
});