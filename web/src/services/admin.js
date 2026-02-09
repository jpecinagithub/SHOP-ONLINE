import { request } from "./api";
import { authHeaders } from "./auth";

async function listOrders() {
  return request("/admin/orders", { headers: authHeaders() });
}

async function updateOrderStatus(orderId, status) {
  return request(`/admin/orders/${orderId}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
}

async function listProducts() {
  return request("/admin/products", { headers: authHeaders() });
}

async function createProduct(payload) {
  return request("/admin/products", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

async function updateProduct(id, payload) {
  return request(`/admin/products/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

async function deleteProduct(id) {
  return request(`/admin/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

export {
  listOrders,
  updateOrderStatus,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
