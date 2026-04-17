import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HumbleSidebar from "@/components/HumbleSidebar";
import { useLocation } from "wouter";
import { Search, MessageSquare, Clock } from "lucide-react";

const conversations = [
  {
    id: "1",
    name: "João Silva",
    lastMessage: "Qual é o preço do produto?",
    timestamp: "10:30",
    unread: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    lastMessage: "Obrigada pela informação!",
    timestamp: "09:15",
    unread: false,
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    lastMessage: "Gostaria de agendar uma reunião",
    timestamp: "08:45",
    unread: true,
  },
];

export default function Conversations() {
  const [, navigate] = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Conversas</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Buscar conversas..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {conversations.map((conv) => (
              <Card
                key={conv.id}
                className="p-4 bg-card border-border cursor-pointer hover:bg-muted transition-colors"
                onClick={() => navigate(`/conversation/${conv.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageSquare className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {conv.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock size={14} />
                      {conv.timestamp}
                    </span>
                    {conv.unread && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
