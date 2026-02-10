import { useEffect, useState } from "react";
import { listProducts } from "../services/products";
import { Link } from "react-router-dom";
import { getProductImage } from "../utils/productImage";

function Catalog() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    listProducts()
      .then((data) => setItems(data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  const filtered = items.filter((product) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const name = product.name?.toLowerCase() || "";
    const desc = product.description?.toLowerCase() || "";
    return name.includes(q) || desc.includes(q);
  });

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Catálogo</h1>
          <p>Listado completo de productos.</p>
        </div>
        <div className="toolbar">
          <div className="search">
            <input
              placeholder="Buscar por nombre o descripción"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="btn ghost" type="button">Filtros</button>
        </div>
        {error && <p className="message warning">{error}</p>}
        <div className="grid">
          {filtered.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-media">
                {getProductImage({ id: product.id, sku: product.sku }) && (
                  <img src={getProductImage({ id: product.id, sku: product.sku })} alt={product.name} />
                )}
                <span className="media-label">{product.name}</span>
              </div>
              <div className="product-info">
                <span className="badge">Nuevo</span>
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

export default Catalog;
