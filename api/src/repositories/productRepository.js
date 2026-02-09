const pool = require("../config/db");

function mapRow(row) {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    priceCents: row.price_cents,
    currency: row.currency,
    stock: row.stock,
    isActive: Boolean(row.is_active),
  };
}

async function listActive() {
  const [rows] = await pool.query(
    "SELECT id, sku, name, description, price_cents, currency, stock, is_active FROM products WHERE is_active = 1 ORDER BY id DESC"
  );
  return rows.map(mapRow);
}

async function findById(id) {
  const [rows] = await pool.query(
    "SELECT id, sku, name, description, price_cents, currency, stock, is_active FROM products WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ? mapRow(rows[0]) : null;
}

module.exports = { listActive, findById };
