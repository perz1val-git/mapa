global.__base = __dirname;

const express = require('express');
const vhost = require('vhost');
//const db = require('./models/database/db');

const app = express();


app.use(vhost('api.mapa.local', require('./routes/api/api')));

app.use(express.static('public'));
app.use('/images', express.static('public/images'));

app.use('/', require('./routes/routes'));

app.listen(3000);