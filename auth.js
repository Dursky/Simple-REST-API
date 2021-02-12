/*
Authorization file for get data from database.
*/
const jwt = require('jsonwebtoken');
const cjwt = require('njwt')

const createToken = (req, res) => {
    var username = req.flash('passUser')[0];
    var password = req.flash('passUser')[1];  
    const claims = { username: username, password: password}//Data to save in token
    const token = cjwt.create(claims, 'top-secret-phrase')
    token.setExpiration(new Date().getTime() + 60*1000)//Expiration for 1 minute
    var generateToken = token.compact();
    res.send(generateToken)//Send this token back to client side
    if(generateToken.length > 0){
      req.flash('Token',generateToken)
      //res.redirect('/verify')
    }else{
      res.send("Problem creating token - check login details")
    }
   
}
//Check for what first res or req 
const verifyToken = (req,res) => {
    var token = req.flash('Token');

    jwt.verify(token, 'top-secret-phrase', (err, verifiedJwt) => {
    if(err){
      res.send(err.message)
    }else{
      res.send(verifiedJwt)
    }
  })
}

const login = (req, res) => {
  var user = req.body.username;
  var pass = req.body.password;
  if(pass > 0 && user > 0){
    req.flash('passUser',[user,pass]);
  }
  res.redirect('/create')
  //console.log(req.flash('passUser')[0].length)
}
module.exports ={
    createToken,
    verifyToken,
    login
}