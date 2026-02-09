import { request } from "./api";
import { authHeaders } from "./auth";

async function checkout(payload) {
  return request("/checkout", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

export { checkout };
