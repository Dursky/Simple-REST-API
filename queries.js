const db = require('./config/db-config');


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
    const { name, email } = req.body
  
    pool.query(`INSERT INTO users (name, email) VALUES (${name}, ${email})`, (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

//PUT USER
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
  
    pool.query(
      `UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`,
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  //DELETE user
  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }

module.exports ={
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}