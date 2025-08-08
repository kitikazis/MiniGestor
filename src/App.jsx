import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DataTable from "./components/DataTable";
import RegistroForm from "./components/RegistroForm";
import useLocalStorage from "./hooks/useLocalStorage";

function Home() {
  return <h1>Inicio</h1>;
}

function Tabla() {
  return <DataTable />;
}

// Nuevo componente para registrar
function Registro() {
  const [data, setData] = useLocalStorage("registros", []);
  const navigate = useNavigate();

  const handleSave = (record) => {
    setData([...data, record]);
    navigate("/tabla");
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", marginTop: 40 }}>
      <RegistroForm
        defaultData={null}
        onSave={handleSave}
        onClose={() => navigate("/tabla")}
      />
    </div>
  );
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
            <Route path="/tabla/:id" element={<DataTable />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
