/*
Authorization file for get data from database.
*/
const jwt = require('./server');

const accessTokenSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJwYXNzd29yZCI6InBhc3N3b3JkMTIzIn0.uhNObRGYF8kmqfTXF38wMz5lL4op8EWDkh0wD_jRnhY';
const users = [
    {
      username: 'Andrzej',
      password: 'zakop',
      role: 'admin'
    } ,{
        username: 'Jan',
        password: 'kowal99',
        role: 'member'
    },{
        username: "john",
        password: "password123",
        role: "admin"
    }
];

const login = (req, res) => {
    var username = req.query.username
    var password = req.query.password
    const user = users.find(u => { return u.username === username && u.password === password });
    //If the given user for example - "Andrzej"
    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
        //Send responde with access token
        res.json({
            accessToken
        });
        //Otherwise send this message
    }else{
        res.send('Username or password incorrect');
    }
    

}
module.exports ={
    login
}