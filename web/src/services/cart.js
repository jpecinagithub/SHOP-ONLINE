import { request } from "./api";
import { authHeaders } from "./auth";

async function getCart() {
  return request("/cart", { headers: authHeaders() });
}

async function addItem(productId, quantity) {
  return request("/cart/items", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
}

async function updateItem(productId, quantity) {
  return request(`/cart/items/${productId}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
}

async function removeItem(productId) {
  return request(`/cart/items/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

export { getCart, addItem, updateItem, removeItem };
