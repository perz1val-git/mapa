const express = require('express');
const api = express();
const mysql = require('mysql');


api.get('/', (req, res) => {
   res.send("API online");
});

//First middleware before response is sent
api.use(function(req, res, next){
   console.log("Start");
   next();
});

//Route handler
api.get('/x', function(req, res, next){
   res.send("Middle");
   next();
});

api.use('/x', function(req, res){
   console.log('End');
});

module.exports = { api };