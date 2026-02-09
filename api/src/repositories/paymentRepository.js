const pool = require("../config/db");

async function findOrderById(orderId, customerId) {
  const [rows] = await pool.query(
    "SELECT id, status, total_cents, currency FROM orders WHERE id = ? AND customer_id = ? LIMIT 1",
    [orderId, customerId]
  );
  return rows[0] || null;
}

async function markOrderPaid(orderId, connection) {
  await connection.query(
    "UPDATE orders SET status = 'paid' WHERE id = ?",
    [orderId]
  );
}

module.exports = { findOrderById, markOrderPaid, pool };
