const ordersRouter = require('express').Router();
const address = require('./getAddresses');
const db = require('../../models/database/db');

ordersRouter.get('/', async function (req, res) {
	try{
		res.send(await db.query('orders'));
	}catch(err){
		console.log(err);
		res.status(401).send('Error');
	}
});

ordersRouter.get('/address', function (req, res) {
	const addresses = address.get();

	addresses.then((result) => {
		res.type('json');
		res.send(JSON.stringify(result, null, 4));
		console.log(result['returned objects']);
	}).catch((err) => {
		console.log(err);
		res.status(401).send('Error');
	})
});

ordersRouter.route('/get')

module.exports = ordersRouter;