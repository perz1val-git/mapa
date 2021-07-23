const express = require("express");
const vhost = require("vhost");

const { api } = require("./api/api");

const app = express();

app.use(vhost("api.mapa.local", api));

app.use(express.static('public'));
app.use("/images", express.static('public/images'));

app.get('/route', function(req, res) {
	res.type('json');
	res.send('{"type":"FeatureCollection","features":[{"bbox":[8.681423,49.414599,8.69198,49.420514],"type":"Feature","properties":{"segments":[{"distance":1603.8,"duration":265.9,"steps":[{"distance":1.9,"duration":0.5,"type":11,"instruction":"Head west on Gerhart-Hauptmann-Straße","name":"Gerhart-Hauptmann-Straße","way_points":[0,1]},{"distance":314.0,"duration":75.4,"type":3,"instruction":"Turn sharp right onto Wielandtstraße","name":"Wielandtstraße","way_points":[1,11]},{"distance":737.6,"duration":106.2,"type":1,"instruction":"Turn right onto Mönchhofstraße","name":"Mönchhofstraße","way_points":[11,39]},{"distance":264.3,"duration":38.5,"type":0,"instruction":"Turn left onto Handschuhsheimer Landstraße, B 3","name":"Handschuhsheimer Landstraße, B 3","way_points":[39,55]},{"distance":155.3,"duration":14.0,"type":5,"instruction":"Turn slight right onto Handschuhsheimer Landstraße, B 3","name":"Handschuhsheimer Landstraße, B 3","way_points":[55,59]},{"distance":130.8,"duration":31.4,"type":0,"instruction":"Turn left onto Roonstraße","name":"Roonstraße","way_points":[59,62]},{"distance":0.0,"duration":0.0,"type":10,"instruction":"Arrive at Roonstraße, straight ahead","name":"-","way_points":[62,62]}]}],"summary":{"distance":1603.8,"duration":265.9},"way_points":[0,62]},"geometry":{"coordinates":[[8.681496,49.414601],[8.68147,49.414599],[8.681488,49.41465],[8.681423,49.415698],[8.681423,49.415746],[8.681427,49.415802],[8.681641,49.416539],[8.681656,49.41659],[8.681672,49.416646],[8.681825,49.417081],[8.681875,49.417287],[8.681881,49.417392],[8.682035,49.417389],[8.682107,49.41739],[8.682461,49.417389],[8.682563,49.417388],[8.682676,49.417387],[8.682781,49.417388],[8.683379,49.41738],[8.683595,49.417372],[8.683709,49.417368],[8.685294,49.417365],[8.685359,49.417365],[8.685442,49.417365],[8.685713,49.41737],[8.686407,49.417365],[8.686717,49.417366],[8.687376,49.417353],[8.687466,49.417351],[8.687547,49.417349],[8.688256,49.417361],[8.688802,49.417381],[8.690001,49.417413],[8.690275,49.417425],[8.690344,49.417424],[8.690434,49.417417],[8.691467,49.417155],[8.691735,49.417102],[8.691957,49.417117],[8.69198,49.417121],[8.691941,49.41722],[8.691817,49.417369],[8.691427,49.417726],[8.691072,49.418051],[8.690968,49.418158],[8.690936,49.418188],[8.690939,49.418208],[8.690939,49.418296],[8.69092,49.418378],[8.690912,49.418411],[8.69067,49.418981],[8.690664,49.418992],[8.690614,49.419093],[8.690547,49.419174],[8.690479,49.419204],[8.690446,49.419218],[8.690275,49.419577],[8.690123,49.419833],[8.689854,49.420216],[8.689652,49.420514],[8.68963,49.42051],[8.688601,49.420393],[8.687872,49.420318]],"type":"LineString"}}],"bbox":[8.681423,49.414599,8.69198,49.420514],"metadata":{"attribution":"openrouteservice.org | OpenStreetMap contributors","service":"routing","timestamp":1627032092847,"query":{"coordinates":[[8.681495,49.41461],[8.687872,49.420318]],"profile":"driving-car","format":"json"},"engine":{"version":"6.6.1","build_date":"2021-07-05T10:57:48Z","graph_date":"2021-07-05T19:38:13Z"}}}');
});

app.listen(3000, () => {
	console.log("started listening");
});