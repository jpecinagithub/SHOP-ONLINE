import { useEffect, useState } from "react";
import { listOrders, updateOrderStatus } from "../services/admin";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  async function load() {
    try {
      const data = await listOrders();
      setOrders(data.items || []);
    } catch (err) {
      setStatus(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function changeStatus(orderId, nextStatus) {
    try {
      await updateOrderStatus(orderId, nextStatus);
      load();
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Admin · Pedidos</h1>
          <p>Gestión básica de estados.</p>
        </div>
        {status && <p className="message warning">{status}</p>}
        <div className="card">
          <ul className="list">
            {orders.map((order) => (
              <li key={order.id} className="list-row">
                <span>#{order.id} · {order.status}</span>
                <div className="list-actions">
                  <button onClick={() => changeStatus(order.id, "paid")}>Marcar pagado</button>
                  <button onClick={() => changeStatus(order.id, "shipped")}>Enviar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AdminOrders;
