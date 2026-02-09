const adminService = require("../services/adminService");

async function listOrders(req, res, next) {
  try {
    const orders = await adminService.listOrders();
    res.json({ items: orders });
  } catch (err) {
    next(err);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const orderId = Number(req.params.orderId);
    const { status } = req.body || {};
    if (!status) {
      return res.status(400).json({ error: "Missing status" });
    }
    const result = await adminService.updateOrderStatus(orderId, status);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function listProducts(req, res, next) {
  try {
    const products = await adminService.listProducts();
    res.json({ items: products });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const result = await adminService.createProduct(req.body || {});
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = Number(req.params.productId);
    const result = await adminService.updateProduct(id, req.body || {});
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = Number(req.params.productId);
    const result = await adminService.deleteProduct(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listOrders,
  updateOrderStatus,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
