const mysql = require('mysql')
const connection =  mysql.createConnection({
    host     : '127.0.0.1',
    database : 'api_example',
    user     : 'root',
    password : 'root',
    port     : '8889'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;