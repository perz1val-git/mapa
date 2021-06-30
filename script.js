var map = L.map("mapid").setView([52.2, 21.0], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 3,
  maxZoom: 19,
}).addTo(map);
