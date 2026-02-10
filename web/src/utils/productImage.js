function getProductImage(product) {
  if (!product) return "";
  if (product.id) return `/images/products/${product.id}.png`;
  return "";
}

export { getProductImage };
