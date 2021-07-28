const request = require('request');

var address = {};

address.get = function () {
    const baseUrl = 'https://services.gugik.gov.pl/uug/?request=GetAddress&srid=4326&address=';
    const query = 'Kotowo 14';

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

module.exports = address;