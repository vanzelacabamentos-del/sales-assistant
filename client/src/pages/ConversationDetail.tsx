import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { Send, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "contact";
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Olá, gostaria de saber mais sobre seus produtos",
    sender: "contact",
    timestamp: "09:00",
  },
  {
    id: "2",
    text: "Claro! Qual produto você tem interesse?",
    sender: "user",
    timestamp: "09:05",
  },
  {
    id: "3",
    text: "Gostaria de informações sobre o plano premium",
    sender: "contact",
    timestamp: "09:10",
  },
];

export default function ConversationDetail() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6">
        <h1 className="text-2xl font-bold text-foreground mb-8">Sales AI</h1>
        <Button
          onClick={() => navigate("/conversations")}
          className="w-full mb-4"
          variant="outline"
        >
          ← Voltar
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">João Silva</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
          <Button variant="outline">Mais opções</Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-card border-t border-border p-6 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
