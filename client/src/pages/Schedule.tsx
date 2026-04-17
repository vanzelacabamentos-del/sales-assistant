import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Plus, Calendar, Clock } from "lucide-react";

const schedules = [
  { id: "1", title: "Reunião com João Silva", date: "2024-04-20", time: "10:00" },
  { id: "2", title: "Apresentação de Produto", date: "2024-04-21", time: "14:30" },
  { id: "3", title: "Follow-up com Maria", date: "2024-04-22", time: "09:00" },
];

export default function Schedule() {
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
            <h2 className="text-2xl font-bold text-foreground">Agendamentos</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={18} className="mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <Card key={schedule.id} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Calendar className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {schedule.title}
                      </h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {schedule.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {schedule.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Remover
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
