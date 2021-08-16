const transportsRouter = require('express').Router();
const got = require('got');
const transportsModel = require('../../models/enities/transports');

transportsRouter.get('/:id', async (req, res) => {
	res.type('json');

	try {
		const response = await transportsModel.getTransportById(req.params.id);
		res.send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error');
	}
});

transportsRouter.get('/:id/route', async (req, res) => {
	res.type('json');

	try {
		const response = await transportsModel.routeTransport(req.params.id);
		
		res.send(response.body);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error');
	}
});

module.exports = transportsRouter;