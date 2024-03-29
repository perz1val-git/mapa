const express = require('express');
const vhost = require('vhost');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
    process.kill(process.pid, 'SIGINT');
});

const app = express();

app.set('layout', 'layout');
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(vhost('api.mapa.local', require('./routes/api/api')));

app.use(express.static('src/public'));

app.use('/', require('./routes/routes'));

app.listen(3000);