const db = require('./config/db-config');
const auth = require('./auth.js')

/*
List of CRUD methods.In result we create a endpoint

GET — / | displayHome()
GET — /users | getUsers()
GET — /users/:id | getUserById()
POST — users | createUser()
PUT — /users/:id | updateUser()
DELETE — /users/:id | deleteUser()
*/

//GET all USERS
  const getUsers = (req, res) => {
        var sql = "SELECT * FROM users ORDER BY id ASC";
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Records selected");
          res.status(200).json(result);
        });
  }

//GET USER by id 
  const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    var sql = `SELECT * FROM users WHERE id = ${id}`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record selected");
          res.status(200).json(result)
        });
  }

//POST USER 
  const createUser = (req, res) => {
    var name = req.query.name;
    var email = req.query.email;
    const token = auth.generateAccessToken({ username: req.query.name });
    var sql = `INSERT INTO users (name,email,token) VALUES ('${name}', '${email}','${token}')`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted!");
          res.status(200).send(`Insert new user on ID:${result['insertId']} and token: ${token}`)
        });
  }

//PUT USER
  const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    var name = req.query.name
    var email = req.query.email
    var sql = `UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${id}`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record update!");
          res.status(200).send(result)
        });      
  }

  //DELETE user
  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
  
    var sql = `DELETE FROM users WHERE id = '${id}'`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record deleted!");
          res.status(200).send(result)
        });
  }

module.exports ={
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}