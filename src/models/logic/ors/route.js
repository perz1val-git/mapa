const got = require('got');

const ors = {};

ors.route = (waypoints) => {
    return got.post('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
        json: { coordinates: waypoints, instructions:false },
        headers: {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Authorization': '5b3ce3597851110001cf62485d3b3c576a73420595830fb7bb9c1908',
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}

module.exports = ors;