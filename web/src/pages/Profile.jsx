import { useEffect, useState } from "react";
import { getProfile } from "../services/customer";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h1>Perfil</h1>
          <p>Datos de tu cuenta.</p>
        </div>
        {error && <p className="message warning">{error}</p>}
        {!profile ? (
          <p>Cargando...</p>
        ) : (
          <div className="page-grid">
            <div className="card">
              <div className="card-header">
                <h3>Datos</h3>
                <span className="badge">Cuenta activa</span>
              </div>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Nombre:</strong> {profile.firstName} {profile.lastName}</p>
              <p><strong>Teléfono:</strong> {profile.phone || "-"}</p>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Acciones</h3>
              </div>
              <p className="muted">Gestiona tus pedidos y datos.</p>
              <div className="hero-actions">
                <a className="btn primary" href="/pedidos">Ver pedidos</a>
                <a className="btn ghost" href="/catalogo">Seguir comprando</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
