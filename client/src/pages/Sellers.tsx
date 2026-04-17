import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Plus, TrendingUp } from "lucide-react";

const sellers = [
  { id: "1", name: "Ana Silva", sales: "R$ 45.000", conversion: "35%" },
  { id: "2", name: "Bruno Costa", sales: "R$ 38.000", conversion: "28%" },
  { id: "3", name: "Carla Mendes", sales: "R$ 52.000", conversion: "42%" },
];

export default function Sellers() {
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
            <h2 className="text-2xl font-bold text-foreground">Vendedores</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={18} className="mr-2" />
              Novo Vendedor
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {sellers.map((seller) => (
              <Card key={seller.id} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{seller.name}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Vendas: {seller.sales}</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp size={14} />
                        Conversão: {seller.conversion}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
