🆔 RENIEC-Simulado
RENIEC-Simulado es una aplicación web de prueba desarrollada con React que simula un panel de gestión de usuarios como si fuera un sistema del RENIEC. Fue creada con fines educativos para practicar operaciones CRUD, autenticación simulada y el consumo de APIs REST.

📌 Descripción General
Aplicación tipo panel administrativo que permite crear, leer, editar y eliminar usuarios usando una API REST simulada (JSONPlaceholder). Incluye sistema de login, navegación entre vistas, búsqueda en tiempo real y persistencia de sesión con localStorage.

🚀 Funcionalidades Principales
🔐 Login simulado (usuario: admin, contraseña: 1234)

📋 Visualización de usuarios en una tabla

📝 Registro y edición de usuarios (POST y PATCH)

❌ Eliminación de usuarios (DELETE)

🔍 Filtros y búsqueda por ciudad o empresa

📁 Menú lateral con navegación entre vistas

💾 Persistencia de sesión en localStorage

✅ Rutas protegidas con PrivateRoute

⚙️ Separación por carpetas limpias

🛠️ Tecnologías Usadas
React

Vite

JavaScript

Axios

React Router DOM

JSONPlaceholder (API simulada)

Ant Design o Material UI (UI opcional)


📂 Estructura Recomendada
bash
Copiar
Editar
/src
 ├── components/
 ├── pages/
 ├── routes/
 ├── services/
 ├── utils/
 └── App.jsx


 🔄 Instalación y Uso
bash
Copiar
Editar
# Crear el proyecto
npm create vite@latest

# Seleccionar React + JavaScript

# Ir al proyecto
cd <nombre-del-proyecto>

# Instalar dependencias
npm install

# Instalar Axios
npm install axios

# Ejecutar la app
npm run dev

