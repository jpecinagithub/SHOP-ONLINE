import { useEffect, useState } from "react";
import { getCart, updateItem, removeItem } from "../services/cart";
import { Link } from "react-router-dom";
import { getProductImage } from "../utils/productImage";

function Cart() {
  const [cart, setCart] = useState(null);
  const [status, setStatus] = useState("");

  async function load() {
    try {
      const data = await getCart();
      setCart(data);
      setStatus("");
    } catch (err) {
      setStatus(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function changeQty(productId, quantity) {
    try {
      const data = await updateItem(productId, quantity);
      setCart(data);
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function remove(productId) {
    try {
      const data = await removeItem(productId);
      setCart(data);
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Carrito</h1>
          <p>Resumen de tus productos.</p>
        </div>
        {status && <p className="message warning">{status}</p>}
        {!cart ? (
          <p>Cargando...</p>
        ) : (
          <div className="page-grid">
            <div className="card">
              {cart.items.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🧺</div>
                  <strong>Carrito vacío</strong>
                  <p className="muted">Explora el catálogo y añade productos.</p>
                </div>
              ) : (
                <ul className="list">
                  {cart.items.map((item) => (
                    <li key={item.productId} className="list-row">
                      <div className="cart-item">
                        <div className="cart-thumb">
                          {getProductImage({ id: item.productId, sku: item.sku }) && (
                            <img src={getProductImage({ id: item.productId, sku: item.sku })} alt={item.name} />
                          )}
                        </div>
                        <div>
                          <strong>{item.name}</strong>
                          <span className="muted">x{item.quantity}</span>
                        </div>
                      </div>
                      <div className="list-actions">
                        <button onClick={() => changeQty(item.productId, item.quantity + 1)}>+</button>
                        <button onClick={() => changeQty(item.productId, item.quantity - 1)}>-</button>
                        <button onClick={() => remove(item.productId)}>Quitar</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Resumen</h3>
                <span className="muted">Impuestos incluidos</span>
              </div>
              <p className="total">Subtotal: €{(cart.subtotalCents / 100).toFixed(2)}</p>
              <Link className="btn primary" to="/checkout">Ir a checkout</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
