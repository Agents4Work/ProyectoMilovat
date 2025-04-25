'use client';

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import {
  Card, CardContent, CardHeader, CardTitle,
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
  Button, Input, Badge
} from '@/components/ui';
import {
  Search, DollarSign, Home, Check, AlertCircle
} from 'lucide-react';
import DashboardSidebar from '@/components/dashboard-sidebar';
import MultaDescripcionModal from '@/components/multa-descripcion-modal';
import NuevaMultaModal from '@/components/nueva-multa-modal';
import { toast } from '@/hooks/use-toast';
import {
  useFines,
  useCreateFine,
  useMarkFineAsPaid
} from '@/hooks/useFines';

export interface Multa {
  id: string;
  departamento: string;
  propietario: string;
  monto: number;
  descripcion: string;
  fecha: string;
  estatus: 'Completo' | 'Incompleto';
}

export type NewFine = Omit<Multa, 'id'>;

export default function Multas() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showNuevaMultaModal, setShowNuevaMultaModal] = useState(false);
  const [selectedMulta, setSelectedMulta] = useState<Multa | null>(null);

  const { data: multas = [], refetch } = useFines();
  const createFine = useCreateFine();
  const markFineAsPaid = useMarkFineAsPaid();

  const filteredMultas = multas.filter((m: Multa) =>
    m.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.propietario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const montoTotal = multas.reduce((acc: number, multa: Multa) => acc + multa.monto, 0);
  const departamentosConMultas = new Set(multas.map((m: Multa) => m.departamento)).size;
  const multasCompletas = multas.filter((m: Multa) => m.estatus === 'Completo').length;
  const porcentajeCompleto = multas.length > 0
    ? Math.round((multasCompletas / multas.length) * 100)
    : 0;

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleVerDescripcion = (multa: Multa) => {
    setSelectedMulta(multa);
    setShowModal(true);
  };

  const handleMarcarComoPagado = async (id: string) => {
    try {
      await markFineAsPaid.mutateAsync(id);
      toast({
        title: 'Multa pagada',
        description: 'El estado ha sido actualizado',
      });
      refetch();
      setShowModal(false);
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la multa',
        variant: 'destructive',
      });
    }
  };

  const handleAgregarMulta = async (nuevaMulta: NewFine) => {
    await createFine.mutateAsync({
      ...nuevaMulta,
      estatus: 'Incompleto',
    } as Multa);
    setShowNuevaMultaModal(false);
    refetch();
  };

  const handleExportarCSV = () => {
    if (multas.length === 0) {
      toast({
        title: "No hay datos para exportar",
        description: "No se encontraron multas",
        variant: "destructive"
      });
      return;
    }

    let csv = 'ID,Departamento,Propietario,Monto,Fecha,Estatus,Descripción\n';
    multas.forEach((m: Multa) => {
      const desc = m.descripcion.replace(/"/g, '""');
      csv += `${m.id},${m.departamento},"${m.propietario}",${m.monto},${m.fecha},${m.estatus},"${desc}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `multas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;

    if (!role) return navigate('/auth');
    if (role !== 'admin') return navigate('/dashboard');

    setUserRole(role);
  }, [navigate]);

  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole={userRole} />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-2">Multas</h1>
        <p className="text-zinc-400 mb-6">Administración de multas del edificio</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SummaryCard icon={<DollarSign />} label="Monto Total" value={`$${montoTotal.toLocaleString()}`} />
          <SummaryCard icon={<Home />} label="Departamentos con Multas" value={departamentosConMultas} />
          <SummaryCard
            icon={porcentajeCompleto >= 50 ? <Check /> : <AlertCircle />}
            label="Estatus de Pagos"
            value={`${porcentajeCompleto}%`}
            sub={`Pagadas: ${multasCompletas} / ${multas.length}`}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Buscar por departamento o propietario..."
              className="bg-zinc-900/50 border-zinc-800 pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNuevaMultaModal(true)}>
              Nueva Multa
            </Button>
            <Button variant="outline" onClick={handleExportarCSV}>
              Exportar
            </Button>
          </div>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableCaption>Lista de multas administradas</TableCaption>
              <TableHeader className="bg-zinc-800/50">
                <TableRow>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Propietario</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead>Descripción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMultas.length > 0 ? (
                  filteredMultas.map((multa: Multa) => (
                    <TableRow key={multa.id}>
                      <TableCell>{multa.departamento}</TableCell>
                      <TableCell>{multa.propietario}</TableCell>
                      <TableCell>${multa.monto}</TableCell>
                      <TableCell>{formatearFecha(multa.fecha)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            multa.estatus === 'Completo'
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-red-500/10 text-red-500'
                          }>
                          {multa.estatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleVerDescripcion(multa)}>
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-zinc-500">
                      No se encontraron multas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {selectedMulta && (
        <MultaDescripcionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          multa={selectedMulta}
          onMarcarComoPagado={handleMarcarComoPagado}
        />
      )}

      <NuevaMultaModal
        isOpen={showNuevaMultaModal}
        onClose={() => setShowNuevaMultaModal(false)}
        onSave={handleAgregarMulta}
      />
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub
}: {
  icon: JSX.Element;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="mr-4 rounded-full bg-amber-500/10 p-2">{icon}</div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {sub && <p className="text-xs text-zinc-500">{sub}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}