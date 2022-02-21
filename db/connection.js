// Connect to database
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  // MySQL username,
  user: 'root',
  // MySQL password
  password: '',
  database: 'roster'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;