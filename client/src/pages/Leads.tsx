import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { facebookLeadsService, type FacebookLead } from "@/lib/facebookLeadsService";
import { instagramLeadsService, type InstagramLead } from "@/lib/instagramLeadsService";

type Lead = (FacebookLead | InstagramLead) & { id: string };

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "facebook" | "instagram">("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, activeFilter]);

  const loadLeads = () => {
    setIsLoading(true);
    try {
      const facebookLeads = facebookLeadsService.getSyncedLeads();
      const instagramLeads = instagramLeadsService.getSyncedLeads();
      const allLeads = [...facebookLeads, ...instagramLeads];
      setLeads(allLeads);
    } catch (error) {
      console.error("Erro ao carregar leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    if (activeFilter !== "all") {
      filtered = filtered.filter((lead) => lead.source === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  };

  const handleSyncFacebook = async () => {
    setIsLoading(true);
    try {
      await facebookLeadsService.syncLeads();
      loadLeads();
    } catch (error) {
      console.error("Erro ao sincronizar Facebook:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncInstagram = async () => {
    setIsLoading(true);
    try {
      await instagramLeadsService.syncLeads();
      loadLeads();
    } catch (error) {
      console.error("Erro ao sincronizar Instagram:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Tem certeza que deseja remover todos os leads?")) {
      facebookLeadsService.clearLeads();
      instagramLeadsService.clearLeads();
      setLeads([]);
    }
  };

  const getSourceIcon = (source: string) => {
    if (source === "facebook") {
      return <Facebook size={18} className="text-blue-600" />;
    }
    return <Instagram size={18} className="text-pink-600" />;
  };

  const getSourceBadge = (source: string) => {
    if (source === "facebook") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          <Facebook size={14} />
          Facebook
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
        <Instagram size={14} />
        Instagram
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Leads</h1>
          <p className="text-muted-foreground">
            Sincronize e gerencie leads do Facebook e Instagram
          </p>
        </div>

        {/* Sync Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Facebook size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Facebook Leads</h3>
                  <p className="text-sm text-muted-foreground">
                    {leads.filter((l) => l.source === "facebook").length} leads
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSyncFacebook}
                disabled={isLoading}
                size="sm"
                className="gap-2"
              >
                <RefreshCw size={16} />
                Sincronizar
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Instagram size={24} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Instagram Leads</h3>
                  <p className="text-sm text-muted-foreground">
                    {leads.filter((l) => l.source === "instagram").length} leads
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSyncInstagram}
                disabled={isLoading}
                size="sm"
                className="gap-2"
              >
                <RefreshCw size={16} />
                Sincronizar
              </Button>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveFilter("all")}
              variant={activeFilter === "all" ? "default" : "outline"}
            >
              Todos ({leads.length})
            </Button>
            <Button
              onClick={() => setActiveFilter("facebook")}
              variant={activeFilter === "facebook" ? "default" : "outline"}
            >
              Facebook ({leads.filter((l) => l.source === "facebook").length})
            </Button>
            <Button
              onClick={() => setActiveFilter("instagram")}
              variant={activeFilter === "instagram" ? "default" : "outline"}
            >
              Instagram ({leads.filter((l) => l.source === "instagram").length})
            </Button>
          </div>

          <Input
            placeholder="Buscar por nome, email ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border"
          />
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <Card className="p-12 bg-card border-border text-center">
              <p className="text-muted-foreground mb-4">Nenhum lead encontrado</p>
              <Button onClick={loadLeads} variant="outline" size="sm">
                Recarregar
              </Button>
            </Card>
          ) : (
            filteredLeads.map((lead) => (
              <Card key={lead.id} className="p-6 bg-card border-border hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-muted rounded-lg">
                      {getSourceIcon(lead.source)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {lead.name}
                        </h3>
                        {getSourceBadge(lead.source)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {lead.email && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail size={16} />
                            <a href={`mailto:${lead.email}`} className="hover:text-primary">
                              {lead.email}
                            </a>
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone size={16} />
                            <a href={`tel:${lead.phone}`} className="hover:text-primary">
                              {lead.phone}
                            </a>
                          </div>
                        )}
                        {lead.company && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 size={16} />
                            {lead.company}
                          </div>
                        )}
                        {lead.message && (
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MessageSquare size={16} className="mt-0.5" />
                            <span className="line-clamp-2">{lead.message}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(lead.createdAt).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteLead(lead.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Clear All Button */}
        {leads.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="text-destructive hover:text-destructive border-destructive"
            >
              <Trash2 size={18} className="mr-2" />
              Limpar Todos
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
