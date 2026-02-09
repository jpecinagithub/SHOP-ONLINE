const paymentRepository = require("../repositories/paymentRepository");

async function payOrder(customerId, payload) {
  const order = await paymentRepository.findOrderById(payload.orderId, customerId);
  if (!order) {
    const error = new Error("Order not found");
    error.status = 404;
    throw error;
  }

  if (order.status === "paid") {
    return { id: order.id, status: order.status };
  }

  if (order.status !== "pending_payment") {
    const error = new Error("Order cannot be paid");
    error.status = 400;
    throw error;
  }

  const connection = await paymentRepository.pool.getConnection();
  try {
    await connection.beginTransaction();
    await paymentRepository.markOrderPaid(order.id, connection);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }

  return { id: order.id, status: "paid" };
}

module.exports = { payOrder };
