import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/products";
import { addItem } from "../services/cart";
import { getProductImage } from "../utils/productImage";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch((err) => setStatus(err.message));
  }, [id]);

  async function handleAdd() {
    try {
      await addItem(Number(id), 1);
      setStatus("Añadido al carrito");
    } catch (err) {
      setStatus(err.message);
    }
  }

  if (!product) {
    return (
      <section className="page">
        <div className="container">
          <p>{status || "Cargando..."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
        <div className="page-grid">
          <div className="card">
            <div className="product-media">
              {getProductImage({ id: product.id, sku: product.sku }) && (
                <img src={getProductImage({ id: product.id, sku: product.sku })} alt={product.name} />
              )}
              <span className="media-label">{product.name}</span>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div>
                <span className="badge">Producto</span>
                <h3>Detalle</h3>
                <p className="muted">SKU: {product.sku}</p>
              </div>
              <strong>€{(product.priceCents / 100).toFixed(2)}</strong>
            </div>
            <p>Stock disponible: {product.stock}</p>
            <div className="hero-actions">
              <button className="btn primary" onClick={handleAdd}>Añadir al carrito</button>
            </div>
            {status && <p className="message success">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
