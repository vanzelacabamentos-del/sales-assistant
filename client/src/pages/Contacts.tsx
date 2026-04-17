import HumbleSidebar from "@/components/HumbleSidebar";
import EditableContactCard, { Contact } from "@/components/EditableContactCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users } from "lucide-react";
import { useState } from "react";

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@techsolutions.com",
    phone: "(11) 99999-9999",
    company: "Tech Solutions",
    position: "Gerente de Vendas",
    notes: "Interessado em solução de CRM",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@marketingplus.com",
    phone: "(11) 98888-8888",
    company: "Marketing Plus",
    position: "Diretora",
    notes: "Reunião agendada para próxima semana",
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos@consultoriaxyz.com",
    phone: "(11) 97777-7777",
    company: "Consultoria XYZ",
    position: "Sócio",
    notes: "Referência do João Silva",
  },
];

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    notes: "",
  });

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.company) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name || "",
        email: newContact.email || "",
        phone: newContact.phone || "",
        company: newContact.company || "",
        position: newContact.position,
        notes: newContact.notes,
      };
      setContacts((prev) => [...prev, contact]);
      setNewContact({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        notes: "",
      });
      setShowNewForm(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Contatos</h1>
            <Button
              onClick={() => setShowNewForm(!showNewForm)}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus size={18} />
              Novo Contato
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Buscar contatos por nome, empresa ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* New Contact Form */}
        {showNewForm && (
          <Card className="p-6 bg-card border-border mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Novo Contato
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome *
                </label>
                <Input
                  placeholder="Nome completo"
                  value={newContact.name || ""}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  className="bg-input border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={newContact.email || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, email: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefone
                  </label>
                  <Input
                    placeholder="(11) 99999-9999"
                    value={newContact.phone || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Empresa *
                  </label>
                  <Input
                    placeholder="Nome da empresa"
                    value={newContact.company || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, company: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cargo
                  </label>
                  <Input
                    placeholder="Cargo/Posição"
                    value={newContact.position || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, position: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notas
                </label>
                <textarea
                  placeholder="Adicione notas sobre este contato"
                  value={newContact.notes || ""}
                  onChange={(e) =>
                    setNewContact({ ...newContact, notes: e.target.value })
                  }
                  className="w-full p-2 rounded-lg border border-border bg-input text-foreground"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddContact}
                  className="bg-primary hover:bg-primary/90"
                >
                  Criar Contato
                </Button>
                <Button
                  onClick={() => setShowNewForm(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Contacts Grid */}
        {filteredContacts.length === 0 ? (
          <Card className="p-8 bg-card border-border text-center">
            <Users size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {contacts.length === 0
                ? "Nenhum contato. Crie um novo contato."
                : "Nenhum contato encontrado."}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <EditableContactCard
                key={contact.id}
                contact={contact}
                onUpdate={handleUpdateContact}
                onDelete={handleDeleteContact}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
