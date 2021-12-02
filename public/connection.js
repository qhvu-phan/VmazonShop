const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: "bachhoachangsen" 
});
connection.connect(function (err) {
    if (err) {
        console.log(err);
    };
    console.log('Database is connected successfully !');
});

module.exports = connection;
