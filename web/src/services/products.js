import { request } from "./api";

async function listProducts() {
  return request("/products");
}

async function getProduct(id) {
  return request(`/products/${id}`);
}

export { listProducts, getProduct };
