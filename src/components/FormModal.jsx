import { useState } from "react";

export default function FormModal({ onSave }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    ocupacion: "",
    edad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: crypto.randomUUID() });
    setForm({
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      ocupacion: "",
      edad: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
        minLength={2}
      />
      <input
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
        minLength={2}
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
        onChange={handleChange}
        placeholder="Edad"
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
