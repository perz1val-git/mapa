const got = require('got');

const Geocoder = {};

Geocoder.fetchAddressesUUG = async (url) => {
    const response = await got(url);

    if (response.statusCode != 200){
        throw new Error('Geocoding error, response code: ' + response.statusCode);
    }

    let results = await JSON.parse(response.body);

    if (results["returned objects"] == 0 && results["only exact numbers"] == 1) {
        return Geocoder.fetchAddressesUUG(url + "&exact_number=0");
    }

    if (response.body["returned objects"] == 0) {
        throw new Error('Geocoding error, no results.');
    }

    return results;
}

Geocoder.geocode = async (order) => {
    const {town, street, number, postal_code} = order;
    if( !town ){
        throw new Error("Geocoding error: no town specified!")
    }
    if( !postal_code ){
        throw new Error("Geocoding error: no postal code specified!")
    }
    if( !number ){
        throw new Error("Geocoding error: no number specified!")
    }

    const baseUrl = 'https://services.gugik.gov.pl/uug/?request=GetAddress&srid=4326&address=';
    const url = baseUrl + town + (street ? (', ' + street) : ' ') + ' ' + number;

    try {
        const results = await Geocoder.fetchAddressesUUG(url);

        let filteredResults = [];
        let compareTo = 6;
        while(filteredResults.length == 0 && compareTo > 1){
            Object.values(results.results).forEach(result => {
                if (result.code.substr(0, compareTo) == order.postal_code.substr(0, compareTo)) {
                    filteredResults.push(result)
                }
            });
            compareTo -= 1;
        }
        if( filteredResults.length == 0 ){
            throw new Error('Geocoding error, no results.');
        }

        order.geo_lat = filteredResults[0].y;
        order.geo_long = filteredResults[0].x;
        order.gStatus = 'success';
        
        if( filteredResults.length > 1 ){
            order.gStatus = 'warning';
        }
    } catch(error) {
        console.error("Geocoder error for order: " + order.id);
        console.error(error);
        
        order.gStatus = 'fail';
    };

    return order;
}

module.exports = Geocoder;