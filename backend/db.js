const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cscpeboy12',
  database: 'EnergySync_DB'
});

module.exports = connection;