import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MessageSquare,
  Clock,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  company?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  status: "entrada" | "esperando" | "finalizado";
  email?: string;
  phone?: string;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "João Silva",
    company: "Tech Solutions",
    lastMessage: "Qual é o preço do produto?",
    timestamp: "10:30",
    unread: true,
    status: "entrada",
    email: "joao@techsolutions.com",
    phone: "(11) 99999-9999",
  },
  {
    id: "2",
    name: "Maria Santos",
    company: "Marketing Plus",
    lastMessage: "Obrigada pela informação!",
    timestamp: "09:15",
    unread: false,
    status: "esperando",
    email: "maria@marketingplus.com",
    phone: "(11) 98888-8888",
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    company: "Consultoria XYZ",
    lastMessage: "Gostaria de agendar uma reunião",
    timestamp: "08:45",
    unread: true,
    status: "finalizado",
    email: "carlos@consultoriaxyz.com",
    phone: "(11) 97777-7777",
  },
];

interface EditingConversation extends Conversation {
  editingId?: string;
}

export default function ConversationTabs() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeTab, setActiveTab] = useState<"entrada" | "esperando" | "finalizado">("entrada");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditingConversation | null>(null);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.status === activeTab &&
      (conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.company?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditData({ ...conversation });
  };

  const handleSaveEdit = () => {
    if (editData) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === editData.id
            ? {
                id: conv.id,
                name: editData.name,
                company: editData.company,
                lastMessage: conv.lastMessage,
                timestamp: conv.timestamp,
                unread: conv.unread,
                status: conv.status,
                email: editData.email,
                phone: editData.phone,
              }
            : conv
        )
      );
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja remover esta conversa?")) {
      setConversations((prev) => prev.filter((conv) => conv.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: "entrada" | "esperando" | "finalizado") => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, status: newStatus } : conv
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "entrada":
        return <AlertCircle size={16} className="text-orange-500" />;
      case "esperando":
        return <Clock size={16} className="text-yellow-500" />;
      case "finalizado":
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  const getTabCount = (status: string) => {
    return conversations.filter((c) => c.status === status).length;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-4">Conversas</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("entrada")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "entrada"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <AlertCircle size={16} />
              Entrada
              <span className="ml-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                {getTabCount("entrada")}
              </span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("esperando")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "esperando"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock size={16} />
              Esperando
              <span className="ml-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                {getTabCount("esperando")}
              </span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("finalizado")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "finalizado"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <CheckCircle size={16} />
              Finalizado
              <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                {getTabCount("finalizado")}
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {filteredConversations.length === 0 ? (
          <Card className="p-8 bg-card border-border text-center">
            <MessageSquare size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhuma conversa nesta categoria
            </p>
          </Card>
        ) : (
          filteredConversations.map((conv) => (
            <Card
              key={conv.id}
              className="p-4 bg-card border-border hover:shadow-md transition-shadow"
            >
              {editingId === conv.id && editData ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nome
                      </label>
                      <Input
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Empresa
                      </label>
                      <Input
                        value={editData.company || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, company: e.target.value })
                        }
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        value={editData.email || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Telefone
                      </label>
                      <Input
                        value={editData.phone || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                        className="bg-input border-border"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveEdit}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Salvar
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline">
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {conv.name}
                        </h3>
                        {getStatusIcon(conv.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {conv.company}
                      </p>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock size={14} />
                      {conv.timestamp}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(conv)}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <Edit2 size={14} />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(conv.id)}
                        variant="outline"
                        size="sm"
                        className="gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
