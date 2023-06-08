const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_covid_19'
});


conn.connect((err) => {
    if (err) throw err;
    console.log('connection');
});

module.exports = conn;