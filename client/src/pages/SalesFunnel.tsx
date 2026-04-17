import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { TrendingDown } from "lucide-react";

const funnelStages = [
  { stage: "Leads", count: 1000, percentage: 100, color: "bg-blue-500" },
  { stage: "Qualificados", count: 650, percentage: 65, color: "bg-blue-600" },
  { stage: "Em Negociação", count: 320, percentage: 32, color: "bg-blue-700" },
  { stage: "Proposta Enviada", count: 180, percentage: 18, color: "bg-blue-800" },
  { stage: "Convertidos", count: 85, percentage: 8.5, color: "bg-green-600" },
];

export default function SalesFunnel() {
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
          <h2 className="text-2xl font-bold text-foreground">Funil de Vendas</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Card className="p-8 bg-card border-border">
            <div className="space-y-6">
              {funnelStages.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{stage.stage}</h3>
                    <span className="text-sm text-muted-foreground">
                      {stage.count} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-12 overflow-hidden">
                    <div
                      className={`${stage.color} h-full flex items-center justify-center text-white font-semibold transition-all duration-500`}
                      style={{ width: `${stage.percentage}%` }}
                    >
                      {stage.percentage > 15 && `${stage.percentage}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingDown size={20} />
                <span>Taxa de conversão geral: 8.5%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
