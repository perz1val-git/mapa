const db = require('../database');

const ordersModel = {};

ordersModel.getOrders = () => {
    return db.query('orders');
}

module.exports = ordersModel;