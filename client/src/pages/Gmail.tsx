import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGoogleSync } from "@/hooks/useGoogleSync";
import { googleAuth } from "@/lib/googleAuth";
import { gmailService } from "@/lib/gmailService";
import {
  Search,
  Archive,
  Trash2,
  Star,
  Mail,
  Plus,
  Loader,
  LogIn,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}

const mockEmails: Email[] = [
  {
    id: "1",
    from: "joao@example.com",
    subject: "Proposta de Parceria",
    preview: "Gostaria de discutir uma possível parceria entre nossas empresas...",
    timestamp: "10:30",
    read: false,
    starred: true,
  },
  {
    id: "2",
    from: "maria@example.com",
    subject: "Confirmação de Pedido #12345",
    preview: "Seu pedido foi confirmado e será entregue em 3-5 dias úteis...",
    timestamp: "09:15",
    read: true,
    starred: false,
  },
];

export default function Gmail() {
  const { emails, isLoading, syncEmails } = useGoogleSync();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(googleAuth.isAuthenticated());
  }, []);

  const handleConnectGoogle = async () => {
    try {
      await googleAuth.initiateLogin();
    } catch (error) {
      console.error("Failed to initiate login:", error);
      alert("Falha ao conectar com Google. Tente novamente.");
    }
  };

  const displayEmails = isAuthenticated && emails.length > 0 
    ? emails.map((email) => ({
        id: email.id,
        from: gmailService.parseMessageHeaders(email).from,
        subject: gmailService.parseMessageHeaders(email).subject,
        preview: email.snippet,
        timestamp: new Date(parseInt(email.internalDate)).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        read: !email.labelIds?.includes("UNREAD"),
        starred: email.labelIds?.includes("STARRED") || false,
      }))
    : mockEmails;

  const handleSyncEmails = async () => {
    if (isAuthenticated) {
      await syncEmails();
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Gmail</h1>
            <div className="flex gap-2">
              {isAuthenticated ? (
                <Button
                  onClick={handleSyncEmails}
                  disabled={isLoading}
                  variant="outline"
                  className="gap-2"
                >
                  {isLoading ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <Mail size={18} />
                  )}
                  Sincronizar
                </Button>
              ) : (
                <Button
                  onClick={handleConnectGoogle}
                  className="bg-primary hover:bg-primary/90 gap-2"
                >
                  <LogIn size={18} />
                  Conectar Google
                </Button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Buscar emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email List */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border overflow-hidden">
              <div className="space-y-0">
                {displayEmails.map((email) => (
                  <button
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`w-full p-4 border-b border-border hover:bg-muted transition-colors text-left ${
                      selectedEmail?.id === email.id ? "bg-secondary" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          email.read ? "bg-transparent" : "bg-primary"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium truncate ${
                            email.read
                              ? "text-muted-foreground"
                              : "text-foreground font-semibold"
                          }`}
                        >
                          {email.from}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {email.subject}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {email.timestamp}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Email Detail */}
          <div className="lg:col-span-2">
            {selectedEmail ? (
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedEmail.subject}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      De: {selectedEmail.from}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Star
                        size={20}
                        className={
                          selectedEmail.starred
                            ? "text-primary fill-primary"
                            : "text-muted-foreground"
                        }
                      />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Archive size={20} className="text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 size={20} className="text-destructive" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-foreground leading-relaxed">
                    {selectedEmail.preview}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button className="bg-primary hover:bg-primary/90">
                    Responder
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="bg-card border-border p-12 flex flex-col items-center justify-center h-96">
                <Mail size={48} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Selecione um email para visualizar
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
