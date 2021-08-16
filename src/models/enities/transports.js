const knex = require('../../database/knex');
const schema = require('../../database/schemas').transports;

const orsRouter = require('../logic/ors/route')
const ordersModel = require('./orders')

const Transport = {};

Transport.getTransportById = async (id) => {
    return knex('transports').limit(1)
    .where('id', id)
    .select('id', 'color');
}

Transport.getTransports = async () => {
    return knex('transports')
    .select('id', 'color');
}

Transport.routeToOrder = async (order) => {
    const gMapStart = [52.22766195882907, 21.002182446340015];
    const origin = [ gMapStart[1], gMapStart[0] ]

    const destination = await ordersModel.getGeocodedOrder(id);

    const waypoints = [origin, [destination.geo_long, destination.geo_lat]];

    return orsRouter.route(waypoints);
}

Transport.routeTransport = async (id) => {
    const gMapStart = [52.22766195882907, 21.002182446340015];
    const origin = [ `${gMapStart[1]}`, `${gMapStart[0]}` ]

    const waypoints = [origin];
    const orderlist = await ordersModel.getOrdersInTransport(id);

    orderlist.forEach(order => {
        waypoints.push([order.geo_long, order.geo_lat]);
    });

    return orsRouter.route(waypoints);
}

module.exports = Transport;