var map = L.map('mapid').setView([52.2, 21.0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 3,
    maxZoom: 19,
}).addTo(map);

const style = {
    color: '#ff5500',
    weight: 3,
    smoothFactor: 1,
}

var line;

async function drawline(id) {
    const url = '/transports/' + id;

    const routeInfo = fetch(url);

    const response = await (await fetch(url + '/route')).json();
    
    const pointList = response.features[0].geometry.coordinates;

    const options = [{
        'type': 'LineString',
        'coordinates': pointList
    }];
    
    const color = (await (await routeInfo).json())[0].color;
    
    if(line){
        line.remove();
    }

    line = L.geoJSON(options, {
        style: {
            color: color,
            weight: 3,
            smoothFactor: 1,
        }
    }).addTo(map);
    map.fitBounds(line.getBounds());

    // $.get(url, (response) => {
    //     if(line){
    //         line.remove();
    //     }

    //     var pointList = response.features[0].geometry.coordinates;

    //     var options = [{
    //         'type': 'LineString',
    //         'coordinates': pointList
    //     }];

    //     style.color = 

    //     line = L.geoJSON(options, {
    //         style: style
    //     }).addTo(map);

    //     map.fitBounds(line.getBounds());
    // });
}

var BB = '';

$('#orderlist').load('/orders table');

function newIcon(color) {
    return L.divIcon({
        className: 'marker-icon',
        html: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="'+color+'" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">' +
            '<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>',
        iconAnchor: [18, 36]
    })
}

async function pins(map){
    let response = await fetch("/orders/json");
    response = await response.json();
    response.forEach(element => {
        if(element.geocode_status >= 20 && element.geocode_status < 30){
            L.marker([element.geo_lat, element.geo_long],  { icon: newIcon(element.color || "#555555") }).addTo(map);
        }
    });
}

pins(map);

$('#menu-container').on('click', 'tr', function () {
    const routeId = $( this ).children(':nth-child(3)').html();
    drawline(routeId);
});