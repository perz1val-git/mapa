(function () {
    'use strict';

    L.Routing = L.Routing || {};

    L.Routing.API = L.Class.extend({
        options: {
            serviceUrl: '/route',
            timeout: 30 * 1000,
            urlParameters: {}
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

        route: function (waypoints, callback, context, options) {
            var timedOut = false,
                wps = [],
                url,
                timer,
                wp,
                i;

            options = options || {};
            url = this.buildRouteUrl(waypoints, options);

            timer = setTimeout(function () {
                timedOut = true;
                callback.call(context || callback, {
                    status: -1,
                    message: 'Request request timed out.'
                });
            }, this.options.timeout);

            for (i = 0; i < waypoints.length; i++) {
                wp = waypoints[i];
                wps.push({
                    latLng: wp.latLng,
                    name: wp.name,
                    options: wp.options
                });
            }

            $.get(url, L.bind(function (resp) {
                var data;

                clearTimeout(timer);
                if (!timedOut) {
                    try {
                        console.log(resp);
                        //data = JSON.parse(resp);
                        this._routeDone(resp, wps, callback, context);
                    } catch {
                        callback.call(context || callback, {
                            status: -1,
                            message: 'HTTP request failed'
                        });
                    }
                }
            }, this));

            return this;
        },

        _routeDone: function (response, inputWaypoints, callback, context) {
            var alts = [],
                waypoints,
                waypoint,
                coordinates,
                i, j, k,
                instructions,
                distance,
                time,
                leg,
                steps,
                step,
                maneuver,
                startingSearchIndex,
                instruction,
                path;

            context = context || callback;

            if (!response.routes) {
                callback.call(context, {
                    status: response.type,
                    message: response.details
                });
                return;
            }

            for (i = 0; i < response.routes.length; i++) {
                path = response.routes[i];
                coordinates = this._decodePolyline(path.geometry);
                startingSearchIndex = 0;
                instructions = [];
                waypoints = [];
                time = 0;
                distance = 0;

                for(j = 0; j < path.segments.length; j++) {
                    leg = path.segments[j];
                    steps = leg.steps;
                    for(k = 0; k < steps.length; k++) {
                        step = steps[k];
                        distance += step.distance;
                        time += step.duration;
                        instruction = this._convertInstructions(step, coordinates);
                        instructions.push(instruction);
                        waypoint = coordinates[path.way_points[1]];
                        waypoints.push(waypoint);
                    }
                }

                alts.push({
                    name: 'Routing option ' + i,
                    coordinates: coordinates,
                    instructions: instructions,
                    summary: {
                        totalDistance: distance,
                        totalTime: time,
                    },
                    inputWaypoints: inputWaypoints,
                    waypoints: waypoints
                });
            }

            callback.call(context, null, alts);
        },

        _decodePolyline: function (geometry) {
            var polylineDefined = polyline.fromGeoJSON(geometry);
            var coords = polyline.decode(polylineDefined, 5),
                latlngs = new Array(coords.length),
                i;
            for (i = 0; i < coords.length; i++) {
                latlngs[i] = new L.LatLng(coords[i][0], coords[i][1]);
            }

            return latlngs;
        },

        buildRouteUrl: function (waypoints, options) {
            var computeInstructions = true,
                locs = [],
                i,
                baseUrl;

            for (i = 0; i < waypoints.length; i++) {
                locs.push(waypoints[i].latLng.lng + '%2C' + waypoints[i].latLng.lat);
            }

            baseUrl = this.options.serviceUrl + '?coordinates=' +
                locs.join('%7C');

            return baseUrl + L.Util.getParamString(L.extend({
                instructions: true,
                instructions_format: 'text',
                geometry_format: 'geojson',
                preference: 'recommended',
                units: 'm',
                profile: 'driving-car',
            }, this.options.urlParameters), baseUrl);
        },

        _convertInstructions: function (step, coordinates) {
            return {
                text: step.instruction,
                distance: step.distance,
                time: step.duration,
                index: step.way_points[0]
            };
        },
    });

    L.Routing.api = function (options) {
        return new L.Routing.API(options);
    };

})();