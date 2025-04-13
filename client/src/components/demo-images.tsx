import React from 'react';

// Importar las imágenes desde la carpeta de assets
import dashboardImg from '../assets/dashboard/Imagen Dashboard.png';
import pagosImg from '../assets/dashboard/Imagen Pagos.png';
import incidenciasImg from '../assets/dashboard/imagen Incidencias.png';
import reservasImg from '../assets/dashboard/Imagen Reservas.png';
import documentosImg from '../assets/dashboard/Imagen Documentos.png';

// Para la imagen de configuración, usamos un SVG base64 predefinido
const configuracionDataUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiMxMTFBMjMiLz4KICA8dGV4dCB4PSI0MDAiIHk9IjIyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+Q29uZmlndXJhY2nDs248L3RleHQ+Cjwvc3ZnPgo=";

// Componente que contiene todas las imágenes de demostración
export const DemoImages = {
  Dashboard: dashboardImg,
  Pagos: pagosImg,
  Incidencias: incidenciasImg,
  Reservas: reservasImg,
  Documentos: documentosImg,
  Configuracion: configuracionDataUrl
};