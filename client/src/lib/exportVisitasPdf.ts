// src/lib/exportVisitasPdf.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface VisitaData {
  residente: string;
  departamento: string;
  visitante: string;
  fechaEntrada: string;
  fechaSalida?: string | null;
  estado: string;
}

export function exportVisitasPdf(visitas: VisitaData[]) {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text("Reporte de Visitas", 14, 22);

  // Subtítulo con fecha actual
  doc.setFontSize(11);
  doc.setTextColor(100);
  const fechaActual = new Date().toLocaleDateString();
  doc.text(`Fecha de reporte: ${fechaActual}`, 14, 30);

  // Espaciado antes de la tabla
  const startY = 40;

  // Construcción de la tabla
  autoTable(doc, {
    startY,
    head: [["Residente", "Departamento", "Visitante", "Entrada", "Salida", "Estado"]],
    body: visitas.map((v) => [
      v.residente,
      v.departamento,
      v.visitante,
      v.fechaEntrada,
      v.fechaSalida || "Pendiente",
      v.estado,
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 3,
      halign: 'center',
    },
    headStyles: {
      fillColor: [255, 165, 0], // 🧡 naranja ámbar
      textColor: 0,
      halign: 'center',
    },
  });

  // Descargar el PDF
  doc.save(`reporte_visitas_${new Date().toISOString().slice(0,10)}.pdf`);
}