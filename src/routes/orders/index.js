const ordersRouter = require('express').Router();
const ordersModel = require('../../models/enities/orders');

ordersRouter.get('/', async (req, res) => {
	try {
		const orders = await ordersModel.getOrders();

		res.set('Content-Type', 'text/html');
		res.render('partials/orderlist', { orders: orders });
	} catch (err) {
		console.error(err);
		res.status(500).send('Error');
	}
});

ordersRouter.get('/json', async (req, res) => {
	try {
		const orders = await ordersModel.getOrders();

		ordersModel.geocodeOrders();
		
		res.type('json');
		res.send( orders );
	} catch (err) {
		console.error(err);
		res.status(500).send('Error');
	}
});

ordersRouter.get('/clearGeocode', async (req, res) => {
	ordersModel.clearGeocode();
	res.status(200).send('OK');
});

module.exports = ordersRouter;