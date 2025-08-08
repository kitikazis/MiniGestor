import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * RegistroForm (modal)
 * props:
 *  - defaultData: objeto a editar (o null para nuevo)
 *  - onSave: función(record) que recibe el registro completo a guardar
 *  - onClose: function para cerrar modal
 */
export default function RegistroForm({ defaultData, onSave, onClose }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    ocupacion: "",
  });

  useEffect(() => {
    if (defaultData) {
      // Load fields except computed ones (edad y fechaRegistro quedan tal como correspondan)
      setForm({
        nombre: defaultData.nombre || "",
        apellido: defaultData.apellido || "",
        fechaNacimiento: defaultData.fechaNacimiento || "",
        ocupacion: defaultData.ocupacion || "",
      });
    } else {
      setForm({ nombre: "", apellido: "", fechaNacimiento: "", ocupacion: "" });
    }
  }, [defaultData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const calcularEdad = (fecha) => {
    if (!fecha) return "";
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  };

  const nowFormatted = () => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.apellido.trim() || !form.fechaNacimiento) {
      alert("Completa: nombre, apellido y fecha de nacimiento.");
      return;
    }

    const edad = calcularEdad(form.fechaNacimiento);

    // Si es edición, conserva id y fechaRegistro original (no la actualiza)
    const record = {
      id: defaultData?.id || uuidv4(),
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      fechaNacimiento: form.fechaNacimiento,
      ocupacion: form.ocupacion.trim(),
      edad: typeof edad === "number" ? edad : 0,
      fechaRegistro: defaultData?.fechaRegistro || nowFormatted(),
    };

    onSave(record);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={{ marginTop: 0 }}>
          {defaultData ? "Editar registro" : "Nuevo registro"}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12 }}>Fecha Nac.</span>
            <input
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </label>
          <input
            name="ocupacion"
            placeholder="Ocupación"
            value={form.ocupacion}
            onChange={handleChange}
          />

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    width: 420,
    maxWidth: "90%",
    background: "#fff",
    borderRadius: 8,
    padding: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
};
