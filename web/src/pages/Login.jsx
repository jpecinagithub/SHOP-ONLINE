import { useState } from "react";
import { login } from "../services/auth";
import { setTokens } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await login(form);
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
            <h1>Login</h1>
            <p>Accede con tu cuenta.</p>
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
            <button className="btn primary" type="submit">Entrar</button>
            <p className="muted auth-link">
              ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
            </p>
          </form>
          {error && <p className="message warning">{error}</p>}
        </div>
      </div>
    </section>
  );
}

export default Login;
