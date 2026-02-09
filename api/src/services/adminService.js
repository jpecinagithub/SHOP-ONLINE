const adminRepository = require("../repositories/adminRepository");

async function listOrders() {
  const rows = await adminRepository.listOrders();
  return rows.map((row) => ({
    id: row.id,
    customerId: row.customer_id,
    status: row.status,
    totalCents: row.total_cents,
    currency: row.currency,
    placedAt: row.placed_at,
  }));
}

async function updateOrderStatus(orderId, status) {
  const allowed = ["pending_payment", "paid", "shipped", "cancelled"];
  if (!allowed.includes(status)) {
    const error = new Error("Invalid status");
    error.status = 400;
    throw error;
  }
  await adminRepository.updateOrderStatus(orderId, status);
  return { id: orderId, status };
}

async function listProducts() {
  const rows = await adminRepository.listProducts();
  return rows.map((row) => ({
    id: row.id,
    sku: row.sku,
    name: row.name,
    priceCents: row.price_cents,
    currency: row.currency,
    stock: row.stock,
    isActive: Boolean(row.is_active),
  }));
}

async function createProduct(payload) {
  const required = ["sku", "name", "priceCents"];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error("Missing field: " + field);
      error.status = 400;
      throw error;
    }
  }
  const id = await adminRepository.createProduct(payload);
  return { id };
}

async function updateProduct(id, payload) {
  if (!Number.isInteger(id)) {
    const error = new Error("Invalid product id");
    error.status = 400;
    throw error;
  }
  await adminRepository.updateProduct(id, payload);
  return { id };
}

async function deleteProduct(id) {
  if (!Number.isInteger(id)) {
    const error = new Error("Invalid product id");
    error.status = 400;
    throw error;
  }
  await adminRepository.deleteProduct(id);
  return { id };
}

module.exports = {
  listOrders,
  updateOrderStatus,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
