const pool = require("../config/db");

async function findCustomerByEmail(email) {
  const [rows] = await pool.query(
    "SELECT id, email, password_hash, first_name, last_name, phone, is_active FROM customers WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] || null;
}

async function findCustomerById(id) {
  const [rows] = await pool.query(
    "SELECT id, email, first_name, last_name, phone, is_active FROM customers WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] || null;
}

async function createCustomer(data) {
  const [result] = await pool.query(
    "INSERT INTO customers (email, password_hash, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?)",
    [data.email, data.passwordHash, data.firstName, data.lastName, data.phone]
  );
  return result.insertId;
}

async function createRefreshToken(data) {
  const [result] = await pool.query(
    "INSERT INTO refresh_tokens (customer_id, token_hash, expires_at) VALUES (?, ?, ?)",
    [data.customerId, data.tokenHash, data.expiresAt]
  );
  return result.insertId;
}

async function findRefreshTokenByHash(tokenHash) {
  const [rows] = await pool.query(
    "SELECT id, customer_id, token_hash, expires_at, revoked_at FROM refresh_tokens WHERE token_hash = ? LIMIT 1",
    [tokenHash]
  );
  return rows[0] || null;
}

async function revokeRefreshToken(id) {
  await pool.query(
    "UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = ?",
    [id]
  );
}

module.exports = {
  findCustomerByEmail,
  findCustomerById,
  createCustomer,
  createRefreshToken,
  findRefreshTokenByHash,
  revokeRefreshToken,
};
