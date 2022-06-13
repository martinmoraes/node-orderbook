const { Request, Response } = require('express');
const { validationResult } = require('express-validator');
const { OrderUseCase } = require('../../../../useCase/OrderUseCase');

class OrderController {
  async createOrder(req, res) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const order = req.body;

    let resultedOrder;
    try {
      resultedOrder = await new OrderUseCase().execute(order);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message, error });
      }
      return res.status(400).json({ message: 'unexpected error', error });
    }

    if (resultedOrder === undefined) {
      return res.status(400).json({});
    }

    return res.status(201).json(resultedOrder);
  }
}

module.exports = { OrderController };
