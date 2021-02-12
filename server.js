const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const db = require('./queries')
const auth = require('./auth')
const flash = require('connect-flash');
const session = require('express-session');
const port = 3000

app.use(flash());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(session({ 
  secret:'test-page', 
  saveUninitialized: true, 
  resave: true
})); 
//Ustawianie lokalizacji pliku HTML - u nas PUG
app.set('views', path.join(__dirname, 'views'));
//Aby poprawnie wczytac css musimy zaimportowac w taki sposób poprzez folder "public/css/main.css"
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','pug')

app.get('/', (req, res) => {
   res.render('homepage.pug')
})

app.post('/',auth.login) ;
//Use a CRUD method [Create Read Update Delete]
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users' ,db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

//Use API for authorization
app.get("/create",auth.createToken)
app.get("/verify",auth.verifyToken)

app.listen(port, () => {
    console.log(`Run at 127.0.0.1:${port}.`)
})

module.exports = app;