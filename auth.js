/*
Authorization file for get data from database.
*/
const jwt = require('jsonwebtoken');



function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  var user = req.query.name;
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, verifiedJwt) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
}

function generateAccessToken(username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


module.exports ={
  authenticateToken,
  generateAccessToken
}