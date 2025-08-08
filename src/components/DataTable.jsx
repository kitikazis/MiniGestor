import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import RegistroForm from "./RegistroForm";
import "bootstrap-icons/font/bootstrap-icons.css";
import registrosJson from "../data/registros.json";
/**
 * DataTable con:
 * - Modal para registrar/editar
 * - Buscar por nombre/apellido
 * - Filtro por rango de fecha de nacimiento
 * - Mostrar fechaRegistro con hora
 */
export default function DataTable() {
  const [data, setData] = useLocalStorage("registros", [registrosJson]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const formatFechaDDMMYYYY = (isoOrDate) => {
    if (!isoOrDate) return "";
    const d = new Date(isoOrDate);
    if (isNaN(d)) return String(isoOrDate);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const filtered = data.filter((item) => {
    const full = `${item.nombre} ${item.apellido}`.toLowerCase();
    const matchesSearch = full.includes(search.toLowerCase());

    const fechaNac = new Date(item.fechaNacimiento);
    const startOK = startDate ? fechaNac >= new Date(startDate) : true;
    const endOK = endDate ? fechaNac <= new Date(endDate) : true;

    return matchesSearch && startOK && endOK;
  });

  const openNew = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setShowModal(true);
  };

  const handleSave = (record) => {
    // Si existe registro con id → editar, sino → insertar
    const exists = data.some((d) => d.id === record.id);
    if (exists) {
      setData(data.map((d) => (d.id === record.id ? record : d)));
    } else {
      setData([...data, record]);
    }
  };

  const handleDelete = (id) => {
    if (!confirm("¿Eliminar registro?")) return;
    setData(data.filter((d) => d.id !== id));
  };

  return (
    // ...existing code...

    // ...existing code...
    <div style={{ padding: 12 }}>
      <h2>Registros</h2>

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}
      >
        <button className="btn btn-success" onClick={openNew}>
          <i className="bi bi-plus-circle"></i> Registrar
        </button>

        <input
          placeholder="Buscar nombre o apellido"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: 200 }}
        />

        <label style={{ display: "flex", gap: 4, alignItems: "center" }}>
          Desde:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label style={{ display: "flex", gap: 4, alignItems: "center" }}>
          Hasta:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setSearch("");
            setStartDate("");
            setEndDate("");
          }}
        >
          <i className="bi bi-x-circle"></i> Limpiar
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered table-hover"
          style={{ width: "100%", borderCollapse: "collapse" }}
          border="1"
          cellPadding="8"
        >
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha Nac.</th>
              <th>Ocupación</th>
              <th>Edad</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                  No hay registros
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{formatFechaDDMMYYYY(item.fechaNacimiento)}</td>
                  <td>{item.ocupacion}</td>
                  <td>{item.edad}</td>
                  <td>{item.fechaRegistro}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => openEdit(item)}
                      title="Editar"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                      style={{ marginLeft: 8 }}
                      title="Eliminar"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* ...existing code... */}

      {showModal && (
        <RegistroForm
          defaultData={editing}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
