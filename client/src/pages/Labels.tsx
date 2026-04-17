import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const labels = [
  { id: "1", name: "Hot Lead", color: "bg-red-500" },
  { id: "2", name: "Warm Lead", color: "bg-yellow-500" },
  { id: "3", name: "Cold Lead", color: "bg-blue-500" },
  { id: "4", name: "Converted", color: "bg-green-500" },
];

export default function Labels() {
  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Etiquetas</h1>
              <p className="text-muted-foreground">
                Organize seus leads com etiquetas personalizadas
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus size={18} />
              Nova Etiqueta
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labels.map((label) => (
            <Card key={label.id} className="p-4 bg-card border-border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${label.color}`}></div>
                  <span className="font-medium text-foreground">{label.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 size={18} className="text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
