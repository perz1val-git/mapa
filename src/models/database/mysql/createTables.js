var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '693554311',
    database: 'mapa'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
    var sql = 'CREATE TABLE IF NOT EXISTS `addresses` (' +
        '`id` int(11) NOT NULL AUTO_INCREMENT, ' +
        '`datetime_add` datetime NOT NULL, ' +
        '`datetime_edit` datetime NULL, ' +
        '`town` text NOT NULL, ' +
        '`street` text NULL, ' +
        '`number` text NOT NULL, ' +
        '`code` varchar(6) NOT NULL, ' +
        '`geoLat` text NULL, ' +
        '`geoLang` text NULL, ' +
        '`accepted` tinyint(4) NULL, ' +
        '`fk_route` int(11) NULL, ' +
        '`route_no` int(11) NULL, ' +
        'PRIMARY KEY (`id`) ' +
        ') ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Table created');
    });
});