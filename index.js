const express = require("express");
const vhost = require("vhost");

const { api } = require("./api/api");

const app = express();

app.use(vhost("api.mapa.local", api));

app.use(express.static('public'));

app.listen(3000, () => {
	console.log("started listening");
});