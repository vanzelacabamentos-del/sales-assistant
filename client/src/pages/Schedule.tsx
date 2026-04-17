import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGoogleSync } from "@/hooks/useGoogleSync";
import { Plus, Calendar, Clock, Loader } from "lucide-react";
import { useState } from "react";

const mockSchedules = [
  { id: "1", title: "Reunião com João Silva", date: "2024-04-20", time: "10:00" },
  { id: "2", title: "Apresentação de Produto", date: "2024-04-21", time: "14:30" },
  { id: "3", title: "Follow-up com Maria", date: "2024-04-22", time: "09:00" },
];

export default function Schedule() {
  const { events, isLoading, syncCalendar } = useGoogleSync();
  const [showNewEvent, setShowNewEvent] = useState(false);

  // Combine mock data with Google Calendar events
  const allEvents = [
    ...mockSchedules,
    ...events.map((event) => ({
      id: event.id,
      title: event.summary,
      date: event.start.date || event.start.dateTime?.split("T")[0] || "",
      time: event.start.dateTime?.split("T")[1]?.substring(0, 5) || "",
    })),
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
            <div className="flex gap-2">
              <Button
                onClick={syncCalendar}
                disabled={isLoading}
                variant="outline"
                className="gap-2"
              >
                {isLoading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <Calendar size={18} />
                )}
                Sincronizar
              </Button>
              <Button
                onClick={() => setShowNewEvent(!showNewEvent)}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                <Plus size={18} />
                Novo Agendamento
              </Button>
            </div>
          </div>
        </div>

        {/* New Event Form */}
        {showNewEvent && (
          <Card className="p-6 bg-card border-border mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Novo Agendamento
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Título
                </label>
                <Input placeholder="Título do agendamento" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Data
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Hora
                  </label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descrição
                </label>
                <textarea
                  placeholder="Descrição do agendamento"
                  className="w-full p-2 rounded-lg border border-border bg-input text-foreground"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button className="bg-primary hover:bg-primary/90">Criar</Button>
                <Button
                  onClick={() => setShowNewEvent(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Events List */}
        <div className="space-y-4">
          {allEvents.length === 0 ? (
            <Card className="p-8 bg-card border-border text-center">
              <Calendar size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhum agendamento. Crie um novo ou sincronize com Google Calendar.
              </p>
            </Card>
          ) : (
            allEvents.map((event) => (
              <Card
                key={event.id}
                className="p-4 bg-card border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {event.time}
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
            ))
          )}
        </div>
      </main>
    </div>
  );
}
