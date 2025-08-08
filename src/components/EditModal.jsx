import { useState, useEffect } from "react";

export default function EditModal({ record, onUpdate, onClose }) {
  const [form, setForm] = useState(record);

  useEffect(() => {
    setForm(record);
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
  };

  if (!record) return null;

  return (
    <div
      style={{ border: "1px solid gray", padding: "1rem", background: "#fff" }}
    >
      <h3>Editar registro</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
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
        />
        <input
          type="number"
          name="edad"
          value={form.edad}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
