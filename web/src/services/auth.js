import { request } from "./api";
import { getAccessToken } from "../store/auth";

function authHeaders() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function register(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function login(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function refresh(payload) {
  return request("/auth/refresh", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function logout(payload) {
  return request("/auth/logout", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(),
  });
}

export { register, login, refresh, logout, authHeaders };
