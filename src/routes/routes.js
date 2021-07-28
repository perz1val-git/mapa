const router = require('express').Router();


router.use('/transports', require('./transports'))

router.use('/orders', require('./orders'))

module.exports = router;