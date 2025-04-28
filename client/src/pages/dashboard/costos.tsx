'use client';

import { useState } from "react";
import { usePayments } from "@/hooks/usePayments";
import { Download } from "lucide-react";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Costos() {
  const [search, setSearch] = useState("");
  const { data: payments = [], isLoading } = usePayments();
  console.log("Payments:", payments);

  const filteredPayments = payments.filter(p => {
    const departamento = typeof p.apartmentId === "string" ? p.apartmentId : "";
    return (
      (p.concept?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (departamento.toLowerCase()).includes(search.toLowerCase())
    );
  });

  const handleExportCSV = () => {
    const headers = ["Departamento", "Concepto", "Monto", "Fecha de Cobro", "Estado"];
    const rows = filteredPayments.map(p => [
      typeof p.apartmentId === "string" ? p.apartmentId : "N/A",
      p.concept,
      `$${p.amount}`,
      new Date(p.dueDate).toLocaleDateString(),
      p.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "costos_edificio.csv");
    link.click();
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole="admin" />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-6">Costos</h1>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle>Listado de Costos</CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <div className="flex justify-between mb-4">
              <Input
                type="text"
                placeholder="Buscar por departamento o concepto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md"
              />
              <button 
                onClick={handleExportCSV}
                className="ml-4 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded"
              >
                <Download className="inline mr-2" />
                Exportar
              </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-2">Departamento</th>
                    <th className="p-2">Concepto</th>
                    <th className="p-2">Monto</th>
                    <th className="p-2">Fecha de Cobro</th>
                    <th className="p-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr key={payment._id} className="border-t border-zinc-800 hover:bg-zinc-800/30">
                        <td className="p-2">{typeof payment.apartmentId === "string" ? payment.apartmentId : "N/A"}</td>
                        <td className="p-2">{payment.concept}</td>
                        <td className="p-2">${payment.amount}</td>
                        <td className="p-2">{new Date(payment.dueDate).toLocaleDateString()}</td>
                        <td className="p-2 capitalize">{payment.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-zinc-400">
                        {isLoading ? "Cargando datos..." : "No se encontraron registros"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}