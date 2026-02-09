const images = {
  "TSHIRT-BASIC": "/images/products/product-tshirt.jpg",
  "HOODIE-LITE": "/images/products/product-hoodie.jpg",
  "BAG-URBAN": "/images/products/product-tote.jpg",
};

function getProductImage(product) {
  if (!product) return "";
  if (product.sku && images[product.sku]) return images[product.sku];
  return "";
}

export { getProductImage };
