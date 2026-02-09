const checkoutRepository = require("../repositories/checkoutRepository");

function validateAddress(address) {
  const required = ["label", "recipientName", "line1", "city", "postalCode", "country"];
  for (const field of required) {
    if (!address[field]) {
      const error = new Error("Missing address field: " + field);
      error.status = 400;
      throw error;
    }
  }
}

function calculateTotals(items) {
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price_cents,
    0
  );
  return { subtotalCents, totalCents: subtotalCents, currency: "EUR" };
}

async function createOrderFromCart(customerId, payload) {
  const cartId = await checkoutRepository.getActiveCart(customerId);
  if (!cartId) {
    const error = new Error("Cart is empty");
    error.status = 400;
    throw error;
  }

  const items = await checkoutRepository.getCartItems(cartId);
  if (!items.length) {
    const error = new Error("Cart is empty");
    error.status = 400;
    throw error;
  }

  let addressId = payload.addressId;
  if (addressId) {
    const address = await checkoutRepository.findAddressById(customerId, addressId);
    if (!address) {
      const error = new Error("Address not found");
      error.status = 404;
      throw error;
    }
  } else if (payload.address) {
    validateAddress(payload.address);
  } else {
    const error = new Error("Missing addressId or address");
    error.status = 400;
    throw error;
  }

  const { subtotalCents, totalCents, currency } = calculateTotals(items);

  const connection = await checkoutRepository.pool.getConnection();
  try {
    await connection.beginTransaction();

    if (!addressId) {
      addressId = await checkoutRepository.createAddress(customerId, payload.address);
    }

    const orderId = await checkoutRepository.createOrder(
      customerId,
      addressId,
      totalCents,
      currency,
      connection
    );

    await checkoutRepository.createOrderItems(orderId, items, connection);
    await checkoutRepository.setCartStatus(cartId, "converted", connection);

    await connection.commit();

    return {
      id: orderId,
      status: "pending_payment",
      totalCents,
      currency,
      subtotalCents,
      items: items.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        unitPriceCents: item.unit_price_cents,
      })),
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

module.exports = { createOrderFromCart };
