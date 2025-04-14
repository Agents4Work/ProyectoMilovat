/**
 * Archivo main.tsx
 * 
 * Este es el punto de entrada principal de la aplicación React.
 * Se encarga de renderizar el componente raíz App en el elemento DOM con id "root".
 * 
 * Características:
 * - Utiliza createRoot de React 18 para el renderizado eficiente
 * - Importa los estilos globales desde index.css
 * - Monta la aplicación en el DOM
 */

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
