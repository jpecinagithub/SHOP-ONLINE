const pool = require("../config/db");

async function listOrders() {
  const [rows] = await pool.query(
    "SELECT id, customer_id, status, total_cents, currency, placed_at FROM orders ORDER BY placed_at DESC"
  );
  return rows;
}

async function updateOrderStatus(orderId, status) {
  await pool.query(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, orderId]
  );
}

async function listProducts() {
  const [rows] = await pool.query(
    "SELECT id, sku, name, price_cents, currency, stock, is_active FROM products ORDER BY id DESC"
  );
  return rows;
}

async function createProduct(data) {
  const [result] = await pool.query(
    "INSERT INTO products (sku, name, description, price_cents, currency, stock, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      data.sku,
      data.name,
      data.description || null,
      data.priceCents,
      data.currency || "EUR",
      data.stock || 0,
      data.isActive ? 1 : 0,
    ]
  );
  return result.insertId;
}

async function updateProduct(id, data) {
  await pool.query(
    "UPDATE products SET name = ?, description = ?, price_cents = ?, currency = ?, stock = ?, is_active = ? WHERE id = ?",
    [
      data.name,
      data.description || null,
      data.priceCents,
      data.currency || "EUR",
      data.stock,
      data.isActive ? 1 : 0,
      id,
    ]
  );
}

async function deleteProduct(id) {
  await pool.query(
    "DELETE FROM products WHERE id = ?",
    [id]
  );
}

module.exports = {
  listOrders,
  updateOrderStatus,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
