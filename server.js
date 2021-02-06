const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and MySQL API' })
})

//Use a CRUD method 
app.get('/users', db.getUsers)
app.get('/user/:id', db.getUserById)
app.post('/user', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`Uruchomiono 127.0.0.1:${port}.`)
})