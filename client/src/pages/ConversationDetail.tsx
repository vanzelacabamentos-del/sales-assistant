import HumbleSidebar from "@/components/HumbleSidebar";
import MobileMenu from "@/components/MobileMenu";
import WhatsAppConversation from "@/components/WhatsAppConversation";
import { useLocation } from "wouter";
import { useState } from "react";

interface Message {
  id: string;
  sender: "user" | "contact";
  text: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

interface InternalNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
  assignedTo?: string;
  notes: InternalNote[];
}

const mockConversation: Conversation = {
  id: "1",
  name: "João Silva",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  lastMessage: "Qual é o preço do produto?",
  timestamp: new Date().toISOString(),
  unread: 0,
  messages: [
    {
      id: "1",
      sender: "contact",
      text: "Olá, tudo bem?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "2",
      sender: "user",
      text: "Oi! Tudo certo! Como posso ajudar?",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: "3",
      sender: "contact",
      text: "Gostaria de saber mais sobre seus produtos",
      timestamp: new Date(Date.now() - 3400000).toISOString(),
    },
    {
      id: "4",
      sender: "user",
      text: "Claro! Qual produto você tem interesse?",
      timestamp: new Date(Date.now() - 3300000).toISOString(),
    },
    {
      id: "5",
      sender: "contact",
      text: "Qual é o preço do produto?",
      timestamp: new Date(Date.now() - 3200000).toISOString(),
    },
  ],
  assignedTo: "1",
  notes: [
    {
      id: "1",
      author: "Você",
      text: "Cliente muito interessado em aumentar o pedido",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
};

export default function ConversationDetail() {
  const [, navigate] = useLocation();
  const [conversation, setConversation] = useState<Conversation>(mockConversation);

  const handleAddNote = (noteText: string) => {
    const newNote: InternalNote = {
      id: String(conversation.notes.length + 1),
      author: "Você",
      text: noteText,
      timestamp: new Date().toISOString(),
    };
    setConversation((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }));
  };

  const handleAddInternalMessage = (messageText: string) => {
    console.log("Mensagem interna adicionada:", messageText);
  };

  const handleAssignSeller = (sellerId: string) => {
    setConversation((prev) => ({
      ...prev,
      assignedTo: sellerId,
    }));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />
      <MobileMenu />
      <div className="flex-1 md:ml-64 mt-16 md:mt-0">
        <WhatsAppConversation
          conversation={conversation}
          onBack={() => navigate("/conversations")}
          onAddNote={handleAddNote}
          onAddInternalMessage={handleAddInternalMessage}
          onAssignSeller={handleAssignSeller}
        />
      </div>
    </div>
  );
}
