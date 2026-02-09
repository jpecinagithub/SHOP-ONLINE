import { useEffect, useState } from "react";
import { listProducts, createProduct, deleteProduct } from "../services/admin";

const empty = { sku: "", name: "", priceCents: 0, stock: 0, currency: "EUR", isActive: true };

function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("");

  async function load() {
    try {
      const data = await listProducts();
      setItems(data.items || []);
    } catch (err) {
      setStatus(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    try {
      await createProduct({
        ...form,
        priceCents: Number(form.priceCents),
        stock: Number(form.stock),
      });
      setForm(empty);
      load();
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      load();
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Admin · Productos</h1>
          <p>Alta rápida de productos.</p>
        </div>
        {status && <p className="message warning">{status}</p>}
        <form className="form card" onSubmit={handleSubmit}>
          <label>
            SKU
            <input name="sku" value={form.sku} onChange={handleChange} />
          </label>
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            Precio (cent)
            <input name="priceCents" value={form.priceCents} onChange={handleChange} />
          </label>
          <label>
            Stock
            <input name="stock" value={form.stock} onChange={handleChange} />
          </label>
          <label>
            Moneda
            <input name="currency" value={form.currency} onChange={handleChange} />
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Activo
          </label>
          <button className="btn primary" type="submit">Crear</button>
        </form>

        <div className="card">
          <ul className="list">
            {items.map((item) => (
              <li key={item.id} className="list-row">
                <span>{item.sku} · {item.name}</span>
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AdminProducts;
