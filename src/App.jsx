import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DataTable from "./components/DataTable";
import RegistroForm from "./components/RegistroForm";

function Home() {
  return <h1>Inicio</h1>;
}

function Tabla() {
  return <DataTable />;
}

function Registro() {
  return <RegistroForm />;
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
