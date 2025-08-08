import "bootstrap/dist/css/bootstrap.min.css"; // <-- Agrega esta línea
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { ChakraProvider } from "@chakra-ui/react"; // Ya no se usa
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
