import { useState, useEffect } from "react";

function calcularEdad(fecha) {
  if (!fecha) return "";
  const hoy = new Date();
  const nacimiento = new Date(fecha);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
  return edad;
}

export default function EditModal({ record, onUpdate, onClose }) {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    ocupacion: "",
    edad: "",
  });

  useEffect(() => {
    if (record) {
      setForm({
        id: record.id,
        nombre: record.nombre || "",
        apellido: record.apellido || "",
        fechaNacimiento: record.fechaNacimiento || "",
        ocupacion: record.ocupacion || "",
        edad: record.edad || "",
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "fechaNacimiento") {
        const nuevaEdad = calcularEdad(value);
        return { ...prev, fechaNacimiento: value, edad: nuevaEdad };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Solo los campos requeridos
    const updated = {
      id: form.id,
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      fechaNacimiento: form.fechaNacimiento,
      ocupacion: form.ocupacion.trim(),
      edad: calcularEdad(form.fechaNacimiento),
    };
    onUpdate(updated);
    onClose();
  };

  if (!record) return null;

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "1rem",
        background: "#fff",
        borderRadius: 8,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <h3>Editar registro</h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
          required
        />
        <input
          name="ocupacion"
          value={form.ocupacion}
          onChange={handleChange}
          placeholder="Ocupación"
        />
        <input
          type="number"
          name="edad"
          value={form.edad}
          readOnly
          placeholder="Edad"
          className="form-control-plaintext"
        />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="submit" className="btn btn-success me-2">
            <i className="bi bi-save"></i> Guardar
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            <i className="bi bi-x-circle"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
