const pool = require("../config/db");

async function findAddressById(customerId, addressId) {
  const [rows] = await pool.query(
    "SELECT id, customer_id FROM addresses WHERE id = ? AND customer_id = ? LIMIT 1",
    [addressId, customerId]
  );
  return rows[0] || null;
}

async function createAddress(customerId, data) {
  const [result] = await pool.query(
    `INSERT INTO addresses
      (customer_id, label, recipient_name, line1, line2, city, state, postal_code, country, is_default)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      customerId,
      data.label,
      data.recipientName,
      data.line1,
      data.line2 || null,
      data.city,
      data.state || null,
      data.postalCode,
      data.country,
      data.isDefault ? 1 : 0,
    ]
  );
  return result.insertId;
}

async function getActiveCart(customerId) {
  const [rows] = await pool.query(
    "SELECT id FROM carts WHERE customer_id = ? AND status = 'active' LIMIT 1",
    [customerId]
  );
  return rows[0]?.id || null;
}

async function getCartItems(cartId) {
  const [rows] = await pool.query(
    `SELECT ci.product_id, ci.quantity, ci.unit_price_cents
       FROM cart_items ci
      WHERE ci.cart_id = ?
      ORDER BY ci.id ASC`,
    [cartId]
  );
  return rows;
}

async function createOrder(customerId, addressId, totalCents, currency, connection) {
  const [result] = await connection.query(
    `INSERT INTO orders (customer_id, address_id, status, total_cents, currency)
     VALUES (?, ?, 'pending_payment', ?, ?)`,
    [customerId, addressId, totalCents, currency]
  );
  return result.insertId;
}

async function createOrderItems(orderId, items, connection) {
  if (!items.length) return;
  const values = items.map((item) => [
    orderId,
    item.product_id,
    item.quantity,
    item.unit_price_cents,
  ]);
  await connection.query(
    "INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents) VALUES ?",
    [values]
  );
}

async function setCartStatus(cartId, status, connection) {
  await connection.query(
    "UPDATE carts SET status = ? WHERE id = ?",
    [status, cartId]
  );
}

module.exports = {
  findAddressById,
  createAddress,
  getActiveCart,
  getCartItems,
  createOrder,
  createOrderItems,
  setCartStatus,
  pool,
};
