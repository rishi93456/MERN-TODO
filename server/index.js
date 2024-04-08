const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require ('./Models/Todo')
const app = express()

app.use(cors())
app.use(express.json())
require ('dotenv').config()

const connection = mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

app.get('/get/:result', (req, res) => {
   const result = req.params.result;
   TodoModel.find({result: result})
     .then(result => res.json(result))
     .catch(err => res.json(err));
});

app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
      .then(result => res.json(result))
      .catch(err => res.json(err));
})

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    TodoModel.findByIdAndUpdate({_id:id}, {done: !todo.done})
      .then(result => res.json(result))
      .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({task: task})
      .then(result => res.json(result))
      .catch(err => res.json(err));
})

app.listen(3000, () => {
    console.log("server is running")
})
