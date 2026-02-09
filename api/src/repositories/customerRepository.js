const pool = require("../config/db");

function mapOrder(row) {
  return {
    id: row.id,
    status: row.status,
    totalCents: row.total_cents,
    currency: row.currency,
    placedAt: row.placed_at,
  };
}

async function getCustomerProfile(customerId) {
  const [rows] = await pool.query(
    "SELECT id, email, first_name, last_name, phone, is_active, created_at FROM customers WHERE id = ? LIMIT 1",
    [customerId]
  );
  return rows[0] || null;
}

async function listOrders(customerId) {
  const [rows] = await pool.query(
    "SELECT id, status, total_cents, currency, placed_at FROM orders WHERE customer_id = ? ORDER BY placed_at DESC",
    [customerId]
  );
  return rows.map(mapOrder);
}

async function getOrder(customerId, orderId) {
  const [rows] = await pool.query(
    "SELECT id, status, total_cents, currency, placed_at FROM orders WHERE customer_id = ? AND id = ? LIMIT 1",
    [customerId, orderId]
  );
  return rows[0] || null;
}

async function listOrderItems(orderId) {
  const [rows] = await pool.query(
    `SELECT oi.product_id, oi.quantity, oi.unit_price_cents,
            p.sku, p.name
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = ?
      ORDER BY oi.id ASC`,
    [orderId]
  );
  return rows;
}

module.exports = {
  getCustomerProfile,
  listOrders,
  getOrder,
  listOrderItems,
};
