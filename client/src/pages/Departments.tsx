import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Plus, Users } from "lucide-react";

const departments = [
  { id: "1", name: "Vendas", members: 5, manager: "Ana Silva" },
  { id: "2", name: "Suporte", members: 3, manager: "Bruno Costa" },
  { id: "3", name: "Marketing", members: 4, manager: "Carla Mendes" },
];

export default function Departments() {
  const [, navigate] = useLocation();

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 bg-card border-r border-border p-6">
        <h1 className="text-2xl font-bold text-foreground mb-8">Sales AI</h1>
        <Button onClick={() => navigate("/")} className="w-full mb-4" variant="outline">
          ← Voltar
        </Button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Departamentos</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={18} className="mr-2" />
              Novo Departamento
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <Card key={dept.id} className="p-6 bg-card border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Users className="text-primary" size={20} />
                  </div>
                  <h3 className="font-semibold text-foreground">{dept.name}</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Gerente: {dept.manager}</p>
                  <p>Membros: {dept.members}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Detalhes
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
