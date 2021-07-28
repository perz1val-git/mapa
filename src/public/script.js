const apikey = '5b3ce3597851110001cf62485d3b3c576a73420595830fb7bb9c1908';

var map = L.map('mapid').setView([52.2, 21.0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 3,
    maxZoom: 19,
}).addTo(map);

var pointA = new L.LatLng(52.17394, 20.9116);
var pointB = new L.LatLng(52.1904, 21.04743);

const style = {
    color: 'magenta',
    weight: 5,
    smoothFactor: 1,
}

$.get('/transports/route', function (response) {
    var pointList = response.features[0].geometry.coordinates;

    var myLine = [{
        'type': 'LineString',
        'coordinates': pointList
    }]

    var line = L.geoJSON(myLine, {
        style: style
    }).addTo(map);

    map.fitBounds(line.getBounds());
});
