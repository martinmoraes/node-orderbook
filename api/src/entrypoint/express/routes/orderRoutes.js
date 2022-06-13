const { Router } = require('express');
const { OrderController } = require('../routes/controllers/OrderController');

const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.post('/', orderController.createOrder);

module.exports = { orderRoutes };
