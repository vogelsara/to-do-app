const express = require('express');

let idIndex = 100;
const todos = [];

const app = express();

app.use(express.json());

app.use(express.static('./client'));

app.get('/api/todo', (req, res) => res.json(todos));
app.get('/api/todo/:id', (req, res) => res.json("One todo"));
app.post('/api/todo', (req, res) => {
    if(!req.body.title){
        res.status(400).json({message: "Title is missing :("});
    }
    else if(!req.body.date){
        res.status(400).json({message: "Date is missing"});
    }else{
        const todo = {id: idIndex++, ...req.body};
        todos.push(todo);
        res.status(201).json(todo);
    }

});
app.put('/api/todo', (req, res) => res.json("New todo"));
app.get('/api/todo/:id', (req, res) => res.json("Update todo"));
app.delete('/api/todo/:id', (req, res) => res.json("Delete todo"));

app.use((req, res) =>{
    res.status(404)
    res.json({
        message: "Could not find the resource."
    })
})

app.listen(3000, () => console.log('server is listening'));