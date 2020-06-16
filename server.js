const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/todo', (req, res) => res.json("All todos"));
app.get('/api/todo/:id', (req, res) => res.json("One todo"));
app.post('/api/todo', (req, res) => res.json(req.body));
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