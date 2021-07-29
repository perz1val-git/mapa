const request = require('request');

var geocoder = {};

geocoder.geocode = function (){}

geocoder.geocode = function (){}

geocoder.geocode = function (){}

geocoder.geocode = function (){}

geocoder.geocode = function (){}

geocoder.fetchAddressesUUG = async function (query) {
    try {
        const url = 'https://services.gugik.gov.pl/uug/?request=GetAddress&srid=4326&address=' + encodeURIComponent(query);

        const response = await fetch(url);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

geocoder.buildQueryUUG = function (query) {
}

module.exports = geocoder;