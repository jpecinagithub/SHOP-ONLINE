const customerService = require("../services/customerService");

async function getProfile(req, res, next) {
  try {
    const profile = await customerService.getProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

async function listOrders(req, res, next) {
  try {
    const orders = await customerService.listOrders(req.user.id);
    res.json({ items: orders });
  } catch (err) {
    next(err);
  }
}

async function getOrder(req, res, next) {
  try {
    const orderId = Number(req.params.orderId);
    if (!Number.isInteger(orderId)) {
      return res.status(400).json({ error: "Invalid order id" });
    }
    const order = await customerService.getOrder(req.user.id, orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, listOrders, getOrder };
