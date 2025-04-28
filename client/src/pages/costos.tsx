'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Download, PieChart, TrendingUp, Users, Eye, X } from "lucide-react";
import { PieChart as RPieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, BarChart, Bar } from 'recharts';
import { usePayments } from "@/hooks/usePayments"; // 🧠 Nuevo hook real

export default function Costos() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCosto, setSelectedCosto] = useState<any | null>(null);

  const { data: costos = [], isLoading } = usePayments();

  const costosFiltrados = costos.filter(costo => 
    (costo.concept || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (costo.apartmentId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagadoVsNoPagado = [
    { name: 'Pagado', value: costos.filter(c => c.status === "paid").length },
    { name: 'Pendiente', value: costos.filter(c => c.status !== "paid").length }
  ];

  const porcentajePagado = costos.length > 0 ? (pagadoVsNoPagado[0].value / costos.length) * 100 : 0;

  const datosMontosMensuales = [
    { mes: 'Ene', monto: 0 },
    { mes: 'Feb', monto: 0 },
    { mes: 'Mar', monto: 0 },
    { mes: 'Abr', monto: 0 },
    { mes: 'May', monto: 0 },
    { mes: 'Jun', monto: 0 },
  ];

  const COLORS = ['#10b981', '#ef4444'];

  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return "Pendiente";
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const exportarCSV = () => {
    const headers = ["Departamento", "Concepto", "Monto", "Fecha de Cobro", "Estado"];
    const rows = costosFiltrados.map(c => [
      c.apartmentId || 'N/A',
      c.concept || 'N/A',
      `$${c.amount}`,
      formatearFecha(c.dueDate),
      c.status
    ]);
    const csv = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'costos.csv');
    link.click();
  };

  useEffect(() => {
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    if (!role) {
      navigate('/auth');
      return;
    }
    if (role !== "admin") {
      navigate('/dashboard');
      return;
    }
    setUserRole(role);
  }, [navigate]);

  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <>
      <div className="flex h-screen bg-background">
        <DashboardSidebar userRole={userRole} />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-medium mb-2">Costos</h1>
          <p className="text-zinc-400 mb-6">Análisis y gestión de costos del edificio</p>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* PieChart */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Porcentaje Recaudado</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RPieChart>
                    <Pie data={pagadoVsNoPagado} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                      {pagadoVsNoPagado.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RPieChart>
                </ResponsiveContainer>
                <div className="text-center mt-4 text-amber-500 text-xl font-bold">{porcentajePagado.toFixed(1)}%</div>
              </CardContent>
            </Card>

            {/* LineChart */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Montos Mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={datosMontosMensuales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="monto" stroke="#f59e0b" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Placeholder gráfico */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Gráfico Extra</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center text-zinc-400 h-52">
                Sin datos
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex items-center mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Buscar por departamento o concepto..."
                className="bg-zinc-900/50 border-zinc-800 pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={exportarCSV} className="ml-4 bg-amber-500 hover:bg-amber-600 text-black">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>

          {/* Table */}
          <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableCaption>Listado de costos por departamento</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Fecha Cobro</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">Cargando...</TableCell>
                    </TableRow>
                  ) : costosFiltrados.length > 0 ? (
                    costosFiltrados.map((costo) => (
                      <TableRow key={costo._id}>
                        <TableCell>{costo.apartmentId}</TableCell>
                        <TableCell>{costo.concept}</TableCell>
                        <TableCell>${costo.amount}</TableCell>
                        <TableCell>{formatearFecha(costo.dueDate)}</TableCell>
                        <TableCell className="capitalize">{costo.status}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">Sin resultados</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}