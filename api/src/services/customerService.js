const customerRepository = require("../repositories/customerRepository");

function mapProfile(row) {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
  };
}

async function getProfile(customerId) {
  const row = await customerRepository.getCustomerProfile(customerId);
  if (!row) {
    const error = new Error("Customer not found");
    error.status = 404;
    throw error;
  }
  return mapProfile(row);
}

async function listOrders(customerId) {
  return customerRepository.listOrders(customerId);
}

async function getOrder(customerId, orderId) {
  const order = await customerRepository.getOrder(customerId, orderId);
  if (!order) {
    const error = new Error("Order not found");
    error.status = 404;
    throw error;
  }
  const items = await customerRepository.listOrderItems(orderId);
  return {
    id: order.id,
    status: order.status,
    totalCents: order.total_cents,
    currency: order.currency,
    placedAt: order.placed_at,
    items: items.map((item) => ({
      productId: item.product_id,
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      unitPriceCents: item.unit_price_cents,
    })),
  };
}

module.exports = { getProfile, listOrders, getOrder };
