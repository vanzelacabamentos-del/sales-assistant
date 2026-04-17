import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";

const kanbanData = {
  leads: [
    { id: "1", title: "João Silva", value: "R$ 5.000" },
    { id: "2", title: "Maria Santos", value: "R$ 8.000" },
  ],
  qualified: [
    { id: "3", title: "Carlos Oliveira", value: "R$ 12.000" },
    { id: "4", title: "Ana Costa", value: "R$ 15.000" },
  ],
  negotiation: [
    { id: "5", title: "Bruno Silva", value: "R$ 20.000" },
  ],
  proposal: [
    { id: "6", title: "Fernanda Lima", value: "R$ 25.000" },
  ],
  converted: [
    { id: "7", title: "Roberto Gomes", value: "R$ 30.000" },
  ],
};

interface KanbanColumn {
  title: string;
  items: Array<{ id: string; title: string; value: string }>;
  color: string;
}

const columns: KanbanColumn[] = [
  { title: "Leads", items: kanbanData.leads, color: "bg-blue-50" },
  { title: "Qualificados", items: kanbanData.qualified, color: "bg-indigo-50" },
  { title: "Em Negociação", items: kanbanData.negotiation, color: "bg-purple-50" },
  { title: "Proposta Enviada", items: kanbanData.proposal, color: "bg-pink-50" },
  { title: "Convertidos", items: kanbanData.converted, color: "bg-green-50" },
];

export default function SalesFunnelKanban() {
  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Funil de Vendas - Kanban</h1>
          <p className="text-muted-foreground">
            Visualize seus leads em diferentes estágios
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-max pb-4">
            {columns.map((column) => (
              <div key={column.title} className="flex-shrink-0 w-80">
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-foreground">
                    {column.title} ({column.items.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {column.items.map((item) => (
                    <Card
                      key={item.id}
                      className={`p-4 ${column.color} border border-border cursor-move hover:shadow-md transition-shadow`}
                    >
                      <h4 className="font-medium text-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm font-semibold text-primary">
                        {item.value}
                      </p>
                    </Card>
                  ))}

                  <button className="w-full p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    + Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
