const mysql = require('mysql2');

const dataBase = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '131016',
  database: 'blog_db',
});


console.log('Connesso al database MySQL.');


module.exports = dataBase;