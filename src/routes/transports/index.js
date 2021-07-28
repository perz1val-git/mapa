const transportsRouter = require('express').Router();
const request = require('request');


transportsRouter.get('/route', function (req, res) {
	res.type('json');

	gMapStart = [52.181549114144374, 20.905775639485583];
	gMapFinish = [54.191853314492930, 20.674747713721978];

	coordinates = [[gMapStart[1], gMapStart[0]], [gMapFinish[1], gMapFinish[0]]];
    console.log('requesting ORS route')

	request({
		method: 'POST',
		url: 'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
		body: '{"coordinates":' + JSON.stringify(coordinates) + ',"instructions":"false"}',
		headers: {
			'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
			'Authorization': '5b3ce3597851110001cf62485d3b3c576a73420595830fb7bb9c1908',
			'Content-Type': 'application/json; charset=utf-8'
		}
	}, function (error, response, body) {
		console.log('ORS Request route: ' + JSON.stringify(coordinates) + ', Status:', response.statusCode);
		res.send(body);
	});
});

module.exports = transportsRouter;