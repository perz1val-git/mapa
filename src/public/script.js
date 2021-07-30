var map = L.map('mapid').setView([52.2, 21.0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 3,
    maxZoom: 19,
}).addTo(map);

const style = {
    color: 'Crimson',
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

var BB = '';

$('#menu-container').load('/orders table');