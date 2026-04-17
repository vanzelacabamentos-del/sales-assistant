import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  DollarSign,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  probability: number;
  status: "nova_consulta" | "qualificado" | "orcamento" | "pedido_realizado" | "pedido_processado";
  contact?: string;
  email?: string;
  notes?: string;
}

const stages = [
  { id: "nova_consulta", label: "NOVA CONSULTA", color: "bg-blue-50 border-blue-200" },
  { id: "qualificado", label: "QUALIFICADO", color: "bg-green-50 border-green-200" },
  { id: "orcamento", label: "ORÇAMENTO ENVIADO", color: "bg-yellow-50 border-yellow-200" },
  { id: "pedido_realizado", label: "PEDIDO REALIZADO", color: "bg-purple-50 border-purple-200" },
  { id: "pedido_processado", label: "PEDIDO PROCESSADO", color: "bg-gray-50 border-gray-200" },
];

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Adição rápida",
    company: "Empresa A",
    value: 5000,
    probability: 30,
    status: "nova_consulta",
    contact: "(11) 99999-9999",
    email: "contato@empresa.com",
  },
  {
    id: "2",
    name: "Lead B",
    company: "Empresa B",
    value: 8000,
    probability: 60,
    status: "qualificado",
    contact: "(11) 98888-8888",
    email: "vendas@empresa.com",
  },
  {
    id: "3",
    name: "Lead C",
    company: "Empresa C",
    value: 12000,
    probability: 80,
    status: "orcamento",
    contact: "(11) 97777-7777",
    email: "gerente@empresa.com",
  },
  {
    id: "4",
    name: "Lead D",
    company: "Empresa D",
    value: 15000,
    probability: 100,
    status: "pedido_realizado",
    contact: "(11) 96666-6666",
    email: "admin@empresa.com",
  },
];

export default function SalesFunnelPipeline() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const getLeadsByStatus = (status: string) => {
    return leads.filter((lead) => lead.status === status);
  };

  const getTotalValue = (status: string) => {
    return getLeadsByStatus(status).reduce((sum, lead) => sum + lead.value, 0);
  };

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (newStatus: string) => {
    if (draggedLead) {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === draggedLead.id
            ? { ...lead, status: newStatus as Lead["status"] }
            : lead
        )
      );
      setDraggedLead(null);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 md:p-6 z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Funil de Vendas</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredLeads.length} leads · R$ {filteredLeads.reduce((sum, l) => sum + l.value, 0).toLocaleString("pt-BR")}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2 w-full md:w-auto">
            <Plus size={18} />
            NOVO LEAD
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input
              placeholder="Busca e filtro"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={18} />
            Filtro
          </Button>
        </div>
      </div>

      {/* Pipeline Columns */}
      <div className="overflow-x-auto p-4 md:p-6">
        <div className="flex gap-4 min-w-max">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStatus(stage.id).filter(
              (lead) =>
                lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lead.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const totalValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-96"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage.id)}
              >
                {/* Column Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold text-foreground text-sm">
                      {stage.label}
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      {stageLeads.length} leads
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    R$ {totalValue.toLocaleString("pt-BR")}
                  </div>
                </div>

                {/* Column Container */}
                <div className="space-y-3 min-h-96 bg-muted/30 rounded-lg p-3 border border-border">
                  {stageLeads.length === 0 ? (
                    <div className="flex items-center justify-center h-96 text-center">
                      <p className="text-sm text-muted-foreground">
                        Nenhum lead nesta etapa
                      </p>
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <Card
                        key={lead.id}
                        draggable
                        onDragStart={() => handleDragStart(lead)}
                        className="p-4 bg-white border-border cursor-move hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">
                              {lead.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {lead.company}
                            </p>
                          </div>
                          <button className="p-1 hover:bg-muted rounded">
                            <MoreVertical size={16} className="text-muted-foreground" />
                          </button>
                        </div>

                        {/* Lead Value */}
                        <div className="flex items-center gap-2 mb-3 p-2 bg-blue-50 rounded">
                          <DollarSign size={16} className="text-blue-600" />
                          <span className="font-semibold text-blue-600 text-sm">
                            R$ {lead.value.toLocaleString("pt-BR")}
                          </span>
                        </div>

                        {/* Probability Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">
                              Probabilidade
                            </span>
                            <span className="text-xs font-semibold text-foreground">
                              {lead.probability}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all"
                              style={{ width: `${lead.probability}%` }}
                            />
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 pt-3 border-t border-border">
                          {lead.contact && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                              <Phone size={14} />
                              <span>{lead.contact}</span>
                            </div>
                          )}
                          {lead.email && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                              <Mail size={14} />
                              <span className="truncate">{lead.email}</span>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
