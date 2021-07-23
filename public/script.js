const apikey = "5b3ce3597851110001cf62485d3b3c576a73420595830fb7bb9c1908";

var map = L.map("mapid").setView([52.2, 21.0], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 3,
  maxZoom: 19,
}).addTo(map);

L.Routing.control({
  router: new L.Routing.API(),
  waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
}).addTo(map);
