import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../services/customer";
import { getProductImage } from "../utils/productImage";

function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrder(orderId)
      .then(setOrder)
      .catch((err) => setError(err.message));
  }, [orderId]);

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Pedido #{orderId}</h1>
          <p>Detalle del pedido.</p>
        </div>
        {error && <p className="message warning">{error}</p>}
        {!order ? (
          <p>Cargando...</p>
        ) : (
          <div className="card">
            <div className="card-header">
              <div>
                <h3>Resumen</h3>
                <p className="muted">Estado actual: {order.status}</p>
              </div>
              <strong>€{(order.totalCents / 100).toFixed(2)}</strong>
            </div>
            <ul className="list">
              {order.items.map((item) => (
                <li key={item.productId} className="list-row">
                  <div className="cart-item">
                    <div className="cart-thumb">
                      {getProductImage({ id: item.productId }) && (
                        <img src={getProductImage({ id: item.productId })} alt={item.name} />
                      )}
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span>x{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderDetail;
