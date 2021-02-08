const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const app = express()
const db = require('./queries')
const auth = require('./auth')
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

//Use a CRUD method [Create Read Update Delete]
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users' ,db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

//Use API for authorization
app.post("/login",auth.login)

app.listen(port, () => {
    console.log(`Run at 127.0.0.1:${port}.`)
})