const pool = require("../config/db");

async function findActiveCartId(customerId) {
  const [rows] = await pool.query(
    "SELECT id FROM carts WHERE customer_id = ? AND status = 'active' LIMIT 1",
    [customerId]
  );
  return rows[0]?.id || null;
}

async function createCart(customerId) {
  const [result] = await pool.query(
    "INSERT INTO carts (customer_id, status) VALUES (?, 'active')",
    [customerId]
  );
  return result.insertId;
}

async function listItems(cartId) {
  const [rows] = await pool.query(
    `SELECT ci.product_id, ci.quantity, ci.unit_price_cents,
            p.sku, p.name, p.description
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
      WHERE ci.cart_id = ?
      ORDER BY ci.id ASC`,
    [cartId]
  );
  return rows;
}

async function upsertItem(cartId, productId, quantity, unitPriceCents) {
  await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity, unit_price_cents)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       quantity = quantity + VALUES(quantity),
       unit_price_cents = VALUES(unit_price_cents)`,
    [cartId, productId, quantity, unitPriceCents]
  );
}

async function updateItem(cartId, productId, quantity) {
  await pool.query(
    "UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?",
    [quantity, cartId, productId]
  );
}

async function removeItem(cartId, productId) {
  await pool.query(
    "DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?",
    [cartId, productId]
  );
}

async function findProductById(productId) {
  const [rows] = await pool.query(
    "SELECT id, price_cents, currency, stock, is_active FROM products WHERE id = ? LIMIT 1",
    [productId]
  );
  return rows[0] || null;
}

module.exports = {
  findActiveCartId,
  createCart,
  listItems,
  upsertItem,
  updateItem,
  removeItem,
  findProductById,
};
