const checkoutService = require("../services/checkoutService");

async function createOrder(req, res, next) {
  try {
    const result = await checkoutService.createOrderFromCart(req.user.id, req.body || {});
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder };
