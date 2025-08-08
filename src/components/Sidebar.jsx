import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`p-3 border-end min-vh-100 ${
        theme === "light" ? "bg-light text-dark" : "bg-dark text-light"
      }`}
      style={{ minWidth: "200px" }}
    >
      <h2 className="mb-4">Menú</h2>
      <nav className="nav flex-column mb-3">
        <Link to="/" className="nav-link">
          Inicio
        </Link>
        <Link to="/tabla" className="nav-link">
          Tabla
        </Link>
        <Link to="/registro" className="nav-link">
          Registro
        </Link>
      </nav>
      <hr />
      <button className="btn btn-primary" onClick={toggleTheme}>
        Cambiar a {theme === "light" ? "oscuro" : "claro"}
      </button>
    </aside>
  );
}
