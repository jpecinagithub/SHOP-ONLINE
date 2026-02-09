const cartService = require("../services/cartService");

async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const { productId, quantity } = req.body || {};
    if (!productId || !quantity) {
      return res.status(400).json({ error: "Missing productId or quantity" });
    }
    const cart = await cartService.addItem(req.user.id, Number(productId), Number(quantity));
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const { quantity } = req.body || {};
    if (!Number.isInteger(productId)) {
      return res.status(400).json({ error: "Invalid product id" });
    }
    if (quantity === undefined) {
      return res.status(400).json({ error: "Missing quantity" });
    }
    const cart = await cartService.updateItem(req.user.id, productId, Number(quantity));
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

async function removeItem(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    if (!Number.isInteger(productId)) {
      return res.status(400).json({ error: "Invalid product id" });
    }
    const cart = await cartService.removeItem(req.user.id, productId);
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

module.exports = { getCart, addItem, updateItem, removeItem };
