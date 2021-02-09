/*
Authorization file for get data from database.
*/
const jwt = require('jsonwebtoken');
const cjwt = require('njwt')

const createToken = (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    
    const claims = { username: username, password: password}//Data to save in token
    const token = cjwt.create(claims, 'top-secret-phrase')
    token.setExpiration(new Date().getTime() + 60*1000)//Expiration for 1 minute
    res.send(token.compact())//Send this token back to client side
}
//Check for what first res or req 
const verifyToken = (req,res) => {
    var token = req.params.token;
    jwt.verify(token, 'top-secret-phrase', (err, verifiedJwt) => {
    if(err){
      res.send(err.message)
    }else{
      res.send(verifiedJwt)
    }
  })
}

module.exports ={
    createToken,
    verifyToken
}