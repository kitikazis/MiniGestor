import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function Home() {
  return <h1>Inicio</h1>;
}

function Tabla() {
  return <h1>Vista de Tabla</h1>;
}

function Registro() {
  return <h1>Formulario de Registro</h1>;
}

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ padding: "1rem", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tabla" element={<Tabla />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
