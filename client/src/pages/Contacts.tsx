import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { Search, Plus, Mail, Phone } from "lucide-react";

const contacts = [
  { id: "1", name: "João Silva", email: "joao@example.com", phone: "(11) 99999-1111" },
  { id: "2", name: "Maria Santos", email: "maria@example.com", phone: "(11) 99999-2222" },
  { id: "3", name: "Carlos Oliveira", email: "carlos@example.com", phone: "(11) 99999-3333" },
];

export default function Contacts() {
  const [, navigate] = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6">
        <h1 className="text-2xl font-bold text-foreground mb-8">Sales AI</h1>
        <Button
          onClick={() => navigate("/")}
          className="w-full mb-4"
          variant="outline"
        >
          ← Voltar
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Contatos</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={18} className="mr-2" />
              Novo Contato
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Buscar contatos..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Contacts Table */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card
                key={contact.id}
                className="p-4 bg-card border-border hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {contact.name}
                    </h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {contact.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {contact.phone}
                      </span>
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
