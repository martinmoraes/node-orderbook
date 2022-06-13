const { Router } = require('express');
const { orderRoutes } = require('../routes/orderRoutes');

const routes = Router();

routes.use('/order', orderRoutes);

module.exports = { routes };
