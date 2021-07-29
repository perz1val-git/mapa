const mysql = require('mysql2');

const dbPool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '693554311',
    database: 'mapa',
	multipleStatements: true
});

module.exports = dbPool;