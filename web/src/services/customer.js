import { request } from "./api";
import { authHeaders } from "./auth";

async function getProfile() {
  return request("/customers/me", { headers: authHeaders() });
}

async function listOrders() {
  return request("/customers/orders", { headers: authHeaders() });
}

async function getOrder(orderId) {
  return request(`/customers/orders/${orderId}`, { headers: authHeaders() });
}

export { getProfile, listOrders, getOrder };
