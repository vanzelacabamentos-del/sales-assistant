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
  ChevronLeft,
  ChevronRight,
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
  const [showSidebar, setShowSidebar] = useState(false);
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
    <div className="flex h-screen bg-background flex-col md:flex-row">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 md:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="min-w-0">
                <h2 className="font-semibold text-sm truncate">{conversation.name}</h2>
                <p className="text-xs text-green-100">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors hidden md:block">
              <Phone size={20} />
            </button>
            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors hidden md:block">
              <Video size={20} />
            </button>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors md:hidden"
            >
              {showSidebar ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors hidden md:block">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${
                  message.sender === "user"
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-foreground border border-border rounded-bl-none"
                }`}
              >
                <p>{message.text}</p>
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
        <div className="bg-white border-t border-border p-2 md:p-4">
          <div className="flex items-center gap-1 md:gap-2">
            <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0 hidden md:block">
              <Paperclip size={20} className="text-gray-600" />
            </button>
            <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0 hidden md:block">
              <Smile size={20} className="text-gray-600" />
            </button>
            <Input
              placeholder="Mensagem"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border-0 bg-gray-100 rounded-full text-sm md:text-base"
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Detalhes (Desktop) / Modal (Mobile) */}
      <div
        className={`w-full md:w-80 bg-card border-t md:border-t-0 md:border-l border-border flex flex-col overflow-hidden transition-all duration-300 ${
          showSidebar ? "block" : "hidden md:flex"
        }`}
      >
        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          <button
            onClick={() => {
              setShowNotes(false);
              setShowInternalMessages(false);
            }}
            className={`flex-1 py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              !showNotes && !showInternalMessages
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <User size={14} />
              <span className="hidden md:inline">Detalhes</span>
            </div>
          </button>
          <button
            onClick={() => {
              setShowNotes(true);
              setShowInternalMessages(false);
            }}
            className={`flex-1 py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              showNotes
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <FileText size={14} />
              <span className="hidden md:inline">Notas</span>
            </div>
          </button>
          <button
            onClick={() => {
              setShowNotes(false);
              setShowInternalMessages(true);
            }}
            className={`flex-1 py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              showInternalMessages
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <MessageCircle size={14} />
              <span className="hidden md:inline">Comentários</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
          {/* Detalhes Tab */}
          {!showNotes && !showInternalMessages && (
            <div className="space-y-3 md:space-y-4">
              {/* Contact Info */}
              <Card className="p-3 md:p-4 bg-muted border-0">
                <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">
                  Informações do Contato
                </h3>
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
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
              <Card className="p-3 md:p-4 bg-muted border-0">
                <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">
                  Atribuir Vendedor
                </h3>
                <div className="space-y-1 md:space-y-2">
                  {sellers.map((seller) => (
                    <button
                      key={seller.id}
                      onClick={() => handleAssignSeller(seller.id)}
                      className={`w-full text-left px-2 md:px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
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
              <Card className="p-3 md:p-4 bg-muted border-0">
                <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">
                  Estatísticas
                </h3>
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
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
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-foreground">
                  Adicionar Nota
                </label>
                <textarea
                  placeholder="Digite uma nota..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg text-xs md:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
                <Button
                  onClick={handleAddNote}
                  className="w-full bg-primary hover:bg-primary/90 text-xs md:text-sm"
                  size="sm"
                >
                  Adicionar Nota
                </Button>
              </div>

              {/* Notas List */}
              <div className="space-y-2">
                {conversation.notes.map((note) => (
                  <Card key={note.id} className="p-2 md:p-3 bg-muted border-0">
                    <div className="flex items-start justify-between mb-1 md:mb-2">
                      <p className="font-medium text-xs md:text-sm text-foreground">
                        {note.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(note.timestamp).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <p className="text-xs md:text-sm text-foreground">{note.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Comentários Tab */}
          {showInternalMessages && (
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-foreground">
                  Comentário Interno
                </label>
                <textarea
                  placeholder="Mensagem interna para a equipe..."
                  value={internalMessageInput}
                  onChange={(e) => setInternalMessageInput(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg text-xs md:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
                <Button
                  onClick={handleAddInternalMessage}
                  className="w-full bg-primary hover:bg-primary/90 text-xs md:text-sm"
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
                  <Card key={msg.id} className="p-2 md:p-3 bg-blue-50 border-0">
                    <div className="flex items-start justify-between mb-1 md:mb-2">
                      <p className="font-medium text-xs md:text-sm text-blue-900">
                        {msg.author}
                      </p>
                      <p className="text-xs text-blue-700">
                        {new Date(msg.timestamp).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <p className="text-xs md:text-sm text-blue-900">{msg.text}</p>
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
