import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Plus, Trash2 } from "lucide-react";

const labels = [
  { id: "1", name: "Hot Lead", color: "bg-red-500" },
  { id: "2", name: "Warm Lead", color: "bg-yellow-500" },
  { id: "3", name: "Cold Lead", color: "bg-blue-500" },
  { id: "4", name: "Converted", color: "bg-green-500" },
];

export default function Labels() {
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
            <h2 className="text-2xl font-bold text-foreground">Etiquetas</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={18} className="mr-2" />
              Nova Etiqueta
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {labels.map((label) => (
              <Card key={label.id} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${label.color}`}></div>
                    <span className="font-medium text-foreground">{label.name}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 size={18} className="text-destructive" />
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
