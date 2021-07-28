const express = require('express');
const api = express();

api.get('/', (req, res) => {
   res.send('API online');
});

module.exports = api;