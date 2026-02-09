const cartRepository = require("../repositories/cartRepository");

function formatItem(row) {
  return {
    productId: row.product_id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    quantity: row.quantity,
    unitPriceCents: row.unit_price_cents,
    lineTotalCents: row.quantity * row.unit_price_cents,
  };
}

function buildCart(cartId, items) {
  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0);
  return {
    id: cartId,
    items,
    subtotalCents,
  };
}

async function ensureCart(customerId) {
  let cartId = await cartRepository.findActiveCartId(customerId);
  if (!cartId) {
    cartId = await cartRepository.createCart(customerId);
  }
  return cartId;
}

async function getCart(customerId) {
  const cartId = await ensureCart(customerId);
  const rows = await cartRepository.listItems(cartId);
  const items = rows.map(formatItem);
  return buildCart(cartId, items);
}

async function addItem(customerId, productId, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    const error = new Error("Invalid quantity");
    error.status = 400;
    throw error;
  }

  const product = await cartRepository.findProductById(productId);
  if (!product || !product.is_active) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  const cartId = await ensureCart(customerId);
  await cartRepository.upsertItem(cartId, productId, quantity, product.price_cents);
  return getCart(customerId);
}

async function updateItem(customerId, productId, quantity) {
  if (!Number.isInteger(quantity)) {
    const error = new Error("Invalid quantity");
    error.status = 400;
    throw error;
  }

  const cartId = await ensureCart(customerId);

  if (quantity <= 0) {
    await cartRepository.removeItem(cartId, productId);
    return getCart(customerId);
  }

  await cartRepository.updateItem(cartId, productId, quantity);
  return getCart(customerId);
}

async function removeItem(customerId, productId) {
  const cartId = await ensureCart(customerId);
  await cartRepository.removeItem(cartId, productId);
  return getCart(customerId);
}

module.exports = { getCart, addItem, updateItem, removeItem };
