import { useEffect, useState } from "react";
import { listProducts } from "../services/products";
import { Link } from "react-router-dom";
import { getProductImage } from "../utils/productImage";

function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    listProducts()
      .then((data) => setItems(data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Inicio</h1>
          <p>Una tienda simple y clara con catálogo real desde la API.</p>
        </div>
        <div className="hero-banner">
          <div className="card-header">
            <div>
              <span className="badge gold">Novedad</span>
              <h2>Compra sin fricción</h2>
              <p className="muted">Catálogo, carrito y checkout en pocos pasos.</p>
            </div>
            <div className="hero-actions">
              <Link className="btn primary" to="/catalogo">Explorar</Link>
              <Link className="btn ghost" to="/carrito">Carrito</Link>
            </div>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <span>Entrega</span>
              <strong>24/48h</strong>
            </div>
            <div className="stat-card">
              <span>Pagos</span>
              <strong>Seguros</strong>
            </div>
            <div className="stat-card">
              <span>Soporte</span>
              <strong>Humano</strong>
            </div>
          </div>
        </div>
        {error && <p className="message warning">{error}</p>}
        <div className="grid">
          {items.slice(0, 3).map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-media">
                {getProductImage({ id: product.id, sku: product.sku }) && (
                  <img src={getProductImage({ id: product.id, sku: product.sku })} alt={product.name} />
                )}
                <span className="media-label">{product.name}</span>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="price">€{(product.priceCents / 100).toFixed(2)}</span>
                <Link className="link" to={`/producto/${product.id}`}>Ver detalle</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
