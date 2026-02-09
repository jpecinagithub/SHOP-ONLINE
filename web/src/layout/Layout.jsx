import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "../store/auth";
import { logout } from "../services/auth";

function Layout() {
  const navigate = useNavigate();
  const isAuthed = Boolean(getAccessToken());

  async function handleLogout() {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await logout({ refreshToken });
      }
    } catch (err) {
      // ignore
    } finally {
      clearTokens();
      navigate("/login");
    }
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <span className="brand-mark">SO</span>
            <span className="brand-name">Shop Online</span>
          </div>
          <nav className="nav">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/catalogo">Catálogo</NavLink>
            <NavLink to="/carrito">Carrito</NavLink>
            <NavLink to="/checkout">Checkout</NavLink>
            <NavLink to="/perfil" className="nav-cta">Cuenta</NavLink>
          </nav>
          <div className="header-actions">
            {isAuthed ? (
              <button className="btn ghost" onClick={handleLogout}>Salir</button>
            ) : (
              <NavLink to="/login" className="btn ghost">Entrar</NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© 2026 Shop Online. Todos los derechos reservados.</p>
          <div className="footer-links">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/catalogo">Catálogo</NavLink>
            <NavLink to="/carrito">Carrito</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
