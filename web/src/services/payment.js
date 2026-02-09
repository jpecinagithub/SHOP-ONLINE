import { request } from "./api";
import { authHeaders } from "./auth";

async function pay(orderId) {
  return request("/payment/pay", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ orderId }),
  });
}

export { pay };
