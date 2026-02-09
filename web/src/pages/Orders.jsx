import { useEffect, useState } from "react";
import { listOrders } from "../services/customer";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    listOrders()
      .then((data) => setOrders(data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Pedidos</h1>
          <p>Historial de compras.</p>
        </div>
        {error && <p className="message warning">{error}</p>}
        <div className="card">
          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <strong>Sin pedidos todavía</strong>
              <p className="muted">Cuando compres, aquí verás tu historial.</p>
            </div>
          ) : (
            <ul className="list">
              {orders.map((order) => (
                <li key={order.id} className="list-row">
                  <span>#{order.id} · {order.status}</span>
                  <Link to={`/pedidos/${order.id}`}>Ver</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Orders;
