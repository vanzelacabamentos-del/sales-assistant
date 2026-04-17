import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

const departments = [
  { id: "1", name: "Vendas", members: 5, manager: "Ana Silva" },
  { id: "2", name: "Suporte", members: 3, manager: "Bruno Costa" },
  { id: "3", name: "Marketing", members: 4, manager: "Carla Mendes" },
];

export default function Departments() {
  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Departamentos</h1>
              <p className="text-muted-foreground">
                Gerencie os departamentos da sua empresa
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus size={18} />
              Novo Departamento
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <Card key={dept.id} className="p-6 bg-card border-border hover:shadow-md transition-shadow">
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
      </main>
    </div>
  );
}
