var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '693554311',
    database: 'mapa'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to mysql database');
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Table created');
    });
});