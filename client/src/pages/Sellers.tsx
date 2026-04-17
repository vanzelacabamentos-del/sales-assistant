import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";

const sellers = [
  { id: "1", name: "Ana Silva", sales: "R$ 45.000", conversion: "35%" },
  { id: "2", name: "Bruno Costa", sales: "R$ 38.000", conversion: "28%" },
  { id: "3", name: "Carla Mendes", sales: "R$ 52.000", conversion: "42%" },
];

export default function Sellers() {
  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Vendedores</h1>
              <p className="text-muted-foreground">
                Acompanhe o desempenho de seus vendedores
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus size={18} />
              Novo Vendedor
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {sellers.map((seller) => (
            <Card key={seller.id} className="p-4 bg-card border-border hover:shadow-md transition-shadow">
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
      </main>
    </div>
  );
}
