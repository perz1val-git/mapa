const request = require('request');

var geocoder = {};

geocoder.geocode = function (){}

geocoder.geocode = function (){}

geocoder.geocode = function (){}

geocoder.geocode = function (){}

geocoder.geocode = function (){}

geocoder.fetchAddressesUUG = function (query) {
    const baseUrl = 'https://services.gugik.gov.pl/uug/?request=GetAddress&srid=4326&address=';

    return new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            url: baseUrl + encodeURIComponent(query)
        }, function (err, response, body) {
            if (err) {
                reject(err);
            }
            else {
                try {
                    const json = JSON.parse(body);
                    resolve(json);
                }
                catch {
                    reject('Cannot parse JSON response from UUG')
                }
            }
        });
    })
}

geocoder.buildQueryUUG = function (query) {
}

module.exports = geocoder;