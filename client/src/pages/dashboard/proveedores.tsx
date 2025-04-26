// src/pages/dashboard/proveedores.tsx
"use client";

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search } from "lucide-react";
import { CrearProveedorModal } from "@/components/crear-proveedor-modal";
import { useProviders, Provider } from "@/hooks/useProviders";
import { useCreateProvider } from "@/hooks/useCreateProviders";
import { toast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/dashboard-sidebar";

export default function ProveedoresPage() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: proveedores = [], refetch } = useProviders();
  console.log("💥 Proveedores obtenidos:", proveedores);
  const createProvider = useCreateProvider();

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") as "admin" | "resident" | null;
    if (!role) return navigate("/auth");
    setUserRole(role);
  }, [navigate]);

  if (!userRole) return <div className="flex items-center justify-center h-screen">Cargando...</div>;

  const filtered = proveedores.filter((p: Provider) => {
    return (
      p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.service.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole={userRole} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Proveedores</h1>
          <Button
            className="bg-amber-500 text-black hover:bg-amber-600"
            onClick={() => setShowModal(true)}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Nuevo proveedor
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Buscar proveedor por nombre o servicio"
            className="bg-zinc-900/50 border-zinc-800 pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.length > 0 ? (
            filtered.map((prov: Provider) => (
              <Card key={prov._id} className="border-zinc-800 bg-zinc-900/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{prov.company}</CardTitle>
                  <p className="text-sm text-zinc-500">{prov.service}</p>
                </CardHeader>
                <CardContent className="text-sm text-zinc-400 space-y-1">
                  <p><strong>Email:</strong> {prov.email}</p>
                  <p><strong>Tel:</strong> {prov.phone}</p>
                  <p><strong>Monto:</strong> ${prov.amount}</p>
                  <p className="text-xs text-zinc-500">
                    Registrado el {new Date(prov.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-zinc-500 text-sm col-span-full text-center py-12">
              No hay proveedores registrados.
            </div>
          )}
        </div>
      </main>

      {/* Modal para crear proveedor */}
      <CrearProveedorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (prov) => {
          try {
            await createProvider.mutateAsync({
                name: prov.name,
                service: prov.service,
                email: prov.email,
                phone:prov.phone,
                amount: prov.amount,
            });
            toast({
              title: "Proveedor creado",
              description: "Se ha guardado correctamente.",
            });
            setShowModal(false);
            refetch();
          } catch {
            toast({
              title: "Error",
              description: "No se pudo crear el proveedor.",
              variant: "destructive",
            });
          }
        }}
      />
    </div>
  );
}