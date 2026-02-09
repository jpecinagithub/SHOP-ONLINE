const productRepository = require("../repositories/productRepository");

async function listProducts(req, res, next) {
  try {
    const products = await productRepository.listActive();
    res.json({ items: products });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }
    const product = await productRepository.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}

module.exports = { listProducts, getProduct };
