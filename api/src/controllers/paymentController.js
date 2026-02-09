const paymentService = require("../services/paymentService");

async function pay(req, res, next) {
  try {
    const { orderId } = req.body || {};
    if (!orderId) {
      return res.status(400).json({ error: "Missing orderId" });
    }
    const result = await paymentService.payOrder(req.user.id, { orderId: Number(orderId) });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { pay };
