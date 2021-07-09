const express = require('express');
const api = express();

api.get('/', (req, res) => {
   res.send("Hello from api!");
});

module.exports = { api };