import { useState } from "react";
import { pay } from "../services/payment";

function Payment() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");

  async function handlePay(e) {
    e.preventDefault();
    try {
      const data = await pay(Number(orderId));
      setStatus(`Pago OK. Estado: ${data.status}`);
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <section className="page auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Pago</h1>
            <p>Pago simulado para orden pendiente.</p>
          </div>
          <form className="form auth-form" onSubmit={handlePay}>
            <label>
              ID de orden
              <input value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            </label>
            <button className="btn primary" type="submit">Pagar</button>
          </form>
          {status && <p className="message success">{status}</p>}
        </div>
      </div>
    </section>
  );
}

export default Payment;
