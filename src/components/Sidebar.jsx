import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      style={{
        padding: "1rem",
        borderRight: "1px solid gray",
        minWidth: "200px",
        background: theme === "light" ? "#f9f9f9" : "#222",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <h2>Menú</h2>
      <nav>
        <Link to="/">Inicio</Link> <br />
        <Link to="/tabla">Tabla</Link> <br />
        <Link to="/registro">Registro</Link>
      </nav>
      <hr />
      <button onClick={toggleTheme}>
        Cambiar a {theme === "light" ? "oscuro" : "claro"}
      </button>
    </aside>
  );
}
