const ordersRouter = require('express').Router();
const address = require('./getAddresses');
const ordersModel = require('../../models/orders')

ordersRouter.get('/', async function (req, res) {
	try {
		orders = await ordersModel.getOrders();
		res.set('Content-Type', 'text/html');
		res.render('partials/orderlist', { orders: orders });
	} catch (err) {
		console.log(err);
		res.status(500).send('Error');
	}
});

// było na .then(), sprawdzić czy działa
ordersRouter.get('/address', async function (req, res) {
	try {
		const addresses = await address.get();
		res.type('json');
		res.send(JSON.stringify(addresses, null, 4));
		console.log(addresses['returned objects']);
	} catch(err) {
		console.log(err);
		res.status(500).send('Error');
	}
});

module.exports = ordersRouter;