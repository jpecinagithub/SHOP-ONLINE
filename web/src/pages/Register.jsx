import { useState } from "react";
import { register } from "../services/auth";
import { setTokens } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await register(form);
      setTokens(data.accessToken, data.refreshToken);
      navigate("/perfil");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Registro</h1>
            <p>Crea tu cuenta.</p>
          </div>
          <form className="form auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input name="email" value={form.email} onChange={handleChange} />
            </label>
            <label>
              Password
              <input type="password" name="password" value={form.password} onChange={handleChange} />
            </label>
            <label>
              Nombre
              <input name="firstName" value={form.firstName} onChange={handleChange} />
            </label>
            <label>
              Apellido
              <input name="lastName" value={form.lastName} onChange={handleChange} />
            </label>
            <label>
              Teléfono
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>
            <button className="btn primary" type="submit">Crear cuenta</button>
            <p className="muted auth-link">
              ¿Ya tienes cuenta? <Link to="/login">Entrar</Link>
            </p>
          </form>
          {error && <p className="message warning">{error}</p>}
        </div>
      </div>
    </section>
  );
}

export default Register;
