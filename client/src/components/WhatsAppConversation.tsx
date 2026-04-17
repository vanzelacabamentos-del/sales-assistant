import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Search,
  ArrowLeft,
  User,
  Clock,
  MessageCircle,
  FileText,
} from "lucide-react";

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

interface Props {
  conversation: Conversation;
  onBack: () => void;
  onAssignSeller?: (sellerId: string) => void;
  onAddNote?: (note: string) => void;
  onAddInternalMessage?: (message: string) => void;
}

export default function WhatsAppConversation({
  conversation,
  onBack,
  onAssignSeller,
  onAddNote,
  onAddInternalMessage,
}: Props) {
  const [messageInput, setMessageInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [internalMessageInput, setInternalMessageInput] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showInternalMessages, setShowInternalMessages] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(conversation.assignedTo || "");

  const sellers = [
    { id: "1", name: "Ana Silva" },
    { id: "2", name: "Bruno Costa" },
    { id: "3", name: "Carla Mendes" },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Enviando mensagem:", messageInput);
      setMessageInput("");
    }
  };

  const handleAddNote = () => {
    if (noteInput.trim()) {
      onAddNote?.(noteInput);
      setNoteInput("");
    }
  };

  const handleAddInternalMessage = () => {
    if (internalMessageInput.trim()) {
      onAddInternalMessage?.(internalMessageInput);
      setInternalMessageInput("");
    }
  };

  const handleAssignSeller = (sellerId: string) => {
    setSelectedSeller(sellerId);
    onAssignSeller?.(sellerId);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-lg">{conversation.name}</h2>
                <p className="text-sm text-green-100">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors">
              <Phone size={20} />
            </button>
            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors">
              <Video size={20} />
            </button>
            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors">
              <Search size={20} />
            </button>
            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-foreground border border-border rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-green-100"
                      : "text-muted-foreground"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-border p-4">
          <div className="flex items-center gap-2">
            <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <Paperclip size={20} className="text-gray-600" />
            </button>
            <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <Smile size={20} className="text-gray-600" />
            </button>
            <Input
              placeholder="Mensagem"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border-0 bg-gray-100 rounded-full"
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Detalhes */}
      <div className="w-80 bg-card border-l border-border flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => {
              setShowNotes(false);
              setShowInternalMessages(false);
            }}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              !showNotes && !showInternalMessages
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <User size={16} />
              Detalhes
            </div>
          </button>
          <button
            onClick={() => {
              setShowNotes(true);
              setShowInternalMessages(false);
            }}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              showNotes
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText size={16} />
              Notas
            </div>
          </button>
          <button
            onClick={() => {
              setShowNotes(false);
              setShowInternalMessages(true);
            }}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              showInternalMessages
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle size={16} />
              Comentários
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Detalhes Tab */}
          {!showNotes && !showInternalMessages && (
            <div className="space-y-4">
              {/* Contact Info */}
              <Card className="p-4 bg-muted border-0">
                <h3 className="font-semibold text-foreground mb-3">
                  Informações do Contato
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Nome:</span>{" "}
                    <span className="font-medium">{conversation.name}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    <span className="font-medium">contato@email.com</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Telefone:</span>{" "}
                    <span className="font-medium">(11) 99999-9999</span>
                  </p>
                </div>
              </Card>

              {/* Assign Seller */}
              <Card className="p-4 bg-muted border-0">
                <h3 className="font-semibold text-foreground mb-3">
                  Atribuir Vendedor
                </h3>
                <div className="space-y-2">
                  {sellers.map((seller) => (
                    <button
                      key={seller.id}
                      onClick={() => handleAssignSeller(seller.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedSeller === seller.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-background/80 text-foreground"
                      }`}
                    >
                      {seller.name}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Conversation Stats */}
              <Card className="p-4 bg-muted border-0">
                <h3 className="font-semibold text-foreground mb-3">
                  Estatísticas
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mensagens:</span>
                    <span className="font-medium">
                      {conversation.messages.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última mensagem:</span>
                    <span className="font-medium">
                      {new Date(
                        conversation.messages[conversation.messages.length - 1]
                          ?.timestamp
                      ).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Notas Tab */}
          {showNotes && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Adicionar Nota
                </label>
                <textarea
                  placeholder="Digite uma nota..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
                <Button
                  onClick={handleAddNote}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  Adicionar Nota
                </Button>
              </div>

              {/* Notas List */}
              <div className="space-y-2">
                {conversation.notes.map((note) => (
                  <Card key={note.id} className="p-3 bg-muted border-0">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm text-foreground">
                        {note.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(note.timestamp).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <p className="text-sm text-foreground">{note.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Comentários Tab */}
          {showInternalMessages && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Comentário Interno
                </label>
                <textarea
                  placeholder="Mensagem interna para a equipe..."
                  value={internalMessageInput}
                  onChange={(e) => setInternalMessageInput(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
                <Button
                  onClick={handleAddInternalMessage}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  Enviar Comentário
                </Button>
              </div>

              {/* Internal Messages List */}
              <div className="space-y-2">
                {[
                  {
                    id: "1",
                    author: "Ana Silva",
                    text: "Cliente interessado em aumentar o pedido",
                    timestamp: new Date().toISOString(),
                  },
                  {
                    id: "2",
                    author: "Bruno Costa",
                    text: "Enviar orçamento revisado",
                    timestamp: new Date().toISOString(),
                  },
                ].map((msg) => (
                  <Card key={msg.id} className="p-3 bg-blue-50 border-0">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm text-blue-900">
                        {msg.author}
                      </p>
                      <p className="text-xs text-blue-700">
                        {new Date(msg.timestamp).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <p className="text-sm text-blue-900">{msg.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
