const knex = require('../../database/knex');
const geocoder = require('../logic/uug/geocode');
const schema = require('../../database/schemas').orders;

const geocodeStatuses = {
    never_attempted: 10,
    pending: 11,
    success: 20,
    warning: 21,
    fail: 30
}

const Order = function(data) {
    this.data = this.sanitize(data);
}

Order.prototype.data = {}

Order.prototype.changeName = function (name) {
    this.data.name = name;
}

Order.prototype.get = function (name) {
    return this.data[name];
}

Order.prototype.set = function (name, value) {
    this.data[name] = value;
}

Order.prototype.sanitize = function (data) {
    if(!data){
        return {};
    }
    const newData = {};

    for (let key in schema){
        if (data.hasOwnProperty(key)) {
            newData[key] = schema[key];
        }
    }

    return newData;
}

Order.prototype.save = async () => {
}

Order.getOrderById = (id) => {
    return knex('orders').limit(1)
    .leftJoin('geocode_statuses', 'orders.fk_geocode_statuses', 'geocode_statuses.id')
    .leftJoin('transports', 'orders.fk_transports', 'transports.id')
    .where('id', id)
    .select('orders.id', 'town', 'street', 'number', 'postal_code', 'geo_lat', 'geo_long',
    'geocode_statuses.id as geocode_status', 'geocode_statuses.color as geocode_status_color',
    'geocode_statuses.name as geocode_status_name',
    'transports.id as transport', 'transports.color as color');
}

Order.getOrders = () => {
    return knex('orders')
    .leftJoin('geocode_statuses', 'orders.fk_geocode_statuses', 'geocode_statuses.id')
    .leftJoin('transports', 'orders.fk_transports', 'transports.id')
    .select('orders.id', 'town', 'street', 'number', 'postal_code', 'geo_lat', 'geo_long',
    'geocode_statuses.id as geocode_status', 'geocode_statuses.color as geocode_status_color',
    'geocode_statuses.name as geocode_status_name',
    'transports.id as transport', 'transports.color as color');
}

Order.getOrdersInTransport = (routeId) => {
    return knex('orders')
    .where('fk_transports', routeId)
    .andWhere('fk_geocode_statuses', 'in', [geocodeStatuses.success, geocodeStatuses.warning])
    .leftJoin('transports', 'orders.fk_transports', 'transports.id')
    .orderBy('transports_position')
    .select('orders.id', 'town', 'street', 'number', 'postal_code', 'geo_lat', 'geo_long',
    'transports.id as transport', 'transports.color as color');
}

Order.geocodeOrders = async () => {
    const orders = await knex.select().from('orders').where('fk_geocode_statuses', geocodeStatuses['never_attempted']);
    
    orders.forEach(async (order) => {
        try {
            const q = knex('orders').where('id', order.id).update({ fk_geocode_statuses: geocodeStatuses['never_attempted']});
            const orderGeocoded = await geocoder.geocode(order);

            await q;
            await knex('orders').where('id', order.id)
            .update({ geo_lat: orderGeocoded.geo_lat, 
                geo_long: orderGeocoded.geo_long, 
                fk_geocode_statuses: geocodeStatuses[orderGeocoded.gStatus]});
        } catch(error) {
            console.error(error);
        }
    });
}

Order.clearGeocodeById = (id) => {
    knex('orders').where('id', id).update({ geo_lat: null, geo_long: null, geo_status: geocodeStatuses['never_attempted']});
}

Order.clearGeocode = () => {
    knex('orders').update({ geo_lat: null, geo_long: null, geo_status: geocodeStatuses['never_attempted']});
}


module.exports = Order;