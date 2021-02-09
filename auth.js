/*
Authorization file for get data from database.
*/
const jwt = require('./server');
const cjwt = require('njwt')

//Example token for "Andrzej","zakop"
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFuZHJ6ZWoiLCJwYXNzd29yZCI6Inpha29wIiwianRpIjoiMGVlMGIyYjEtMWQ1NC00ODJhLTg3ODctMWJjOGRmN2NmMGEwIiwiaWF0IjoxNjEyOTAzOTQ0LCJleHAiOjE2MTI5MDQwMDR9.lN7dY2BI8raWFyPFFcf2CkEF1oWNRno6araGyWi15uU

const createToken = (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    
    const claims = { username: username, password: password}//Data to save in token
    const token = cjwt.create(claims, 'top-secret-phrase')
    token.setExpiration(new Date().getTime() + 60*1000)//Expiration for 1 minute
    res.send(token.compact())//Send this token back to client side
}

const verifyToken=(res,req) => {
    const { token } = req.params.token
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