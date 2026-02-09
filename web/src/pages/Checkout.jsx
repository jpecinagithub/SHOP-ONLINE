import { useState } from "react";
import { checkout } from "../services/checkout";

const initialAddress = {
  label: "Casa",
  recipientName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "ES",
  isDefault: true,
};

function Checkout() {
  const [address, setAddress] = useState(initialAddress);
  const [addressId, setAddressId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const payload = addressId ? { addressId: Number(addressId) } : { address };
      const data = await checkout(payload);
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Checkout</h1>
          <p>Crear orden desde el carrito.</p>
        </div>
        <div className="page-grid">
          <form className="form card" onSubmit={handleSubmit}>
            <label>
              Usar dirección existente (ID)
              <input
                value={addressId}
                onChange={(e) => setAddressId(e.target.value)}
                placeholder="Ej: 1"
              />
            </label>

            <div className="divider">O nueva dirección</div>

            <label>
              Etiqueta
              <input name="label" value={address.label} onChange={handleChange} />
            </label>
            <label>
              Nombre receptor
              <input name="recipientName" value={address.recipientName} onChange={handleChange} />
            </label>
            <label>
              Dirección
              <input name="line1" value={address.line1} onChange={handleChange} />
            </label>
            <label>
              Piso / detalle
              <input name="line2" value={address.line2} onChange={handleChange} />
            </label>
            <label>
              Ciudad
              <input name="city" value={address.city} onChange={handleChange} />
            </label>
            <label>
              Provincia
              <input name="state" value={address.state} onChange={handleChange} />
            </label>
            <label>
              Código postal
              <input name="postalCode" value={address.postalCode} onChange={handleChange} />
            </label>
            <label>
              País
              <input name="country" value={address.country} onChange={handleChange} />
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="isDefault"
                checked={address.isDefault}
                onChange={handleChange}
              />
              Usar como predeterminada
            </label>
            <button className="btn primary" type="submit">Crear orden</button>
          </form>
          <div className="card">
            <div className="card-header">
              <h3>Resumen</h3>
              <span className="muted">Se crea en estado pendiente</span>
            </div>
            {error && <p className="message warning">{error}</p>}
            {result ? (
              <>
                <p className="message success">Orden creada: #{result.id}</p>
                <p>Estado: {result.status}</p>
              </>
            ) : (
              <p>Completa la dirección y confirma.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
