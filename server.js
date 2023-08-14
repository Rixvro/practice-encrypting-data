const express = require("express");
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(express.json());

const users = []

app.post('/users/login', async (req, res) =>{
    const user = users.find(user => user.name === req.body.name)
    if (user === null){
        return res.status(400).send("Cannot find user");
    }
    try{
        if (bcrypt.compare(req.body.password, user.password)){
            res.status(200).send("Successfully found user");
        } else{
            res.send("Failure")
        }
    } catch (err){
        res.status(500).send(err);
    }
})

app.post('/users', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        console.log(user)
        users.push(user);
        res.status(201).send(user);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })