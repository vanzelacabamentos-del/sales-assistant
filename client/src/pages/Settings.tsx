import HumbleSidebar from "@/components/HumbleSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  MessageCircle,
  Facebook,
  Instagram,
  Bell,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface IntegrationConfig {
  whatsapp: {
    connected: boolean;
    phoneNumber: string;
    accessToken: string;
    businessAccountId: string;
  };
  facebook: {
    connected: boolean;
    accessToken: string;
    pageId: string;
  };
  instagram: {
    connected: boolean;
    accessToken: string;
    businessAccountId: string;
  };
}

export default function Settings() {
  const [config, setConfig] = useState<IntegrationConfig>({
    whatsapp: {
      connected: false,
      phoneNumber: "",
      accessToken: "",
      businessAccountId: "",
    },
    facebook: {
      connected: false,
      accessToken: "",
      pageId: "",
    },
    instagram: {
      connected: false,
      accessToken: "",
      businessAccountId: "",
    },
  });

  const [activeTab, setActiveTab] = useState<"integrations" | "notifications" | "security">(
    "integrations"
  );
  const [saveMessage, setSaveMessage] = useState("");

  const handleWhatsAppConnect = () => {
    if (config.whatsapp.phoneNumber && config.whatsapp.accessToken) {
      setConfig((prev) => ({
        ...prev,
        whatsapp: { ...prev.whatsapp, connected: true },
      }));
      setSaveMessage("✓ WhatsApp conectado com sucesso!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleFacebookConnect = () => {
    if (config.facebook.accessToken && config.facebook.pageId) {
      setConfig((prev) => ({
        ...prev,
        facebook: { ...prev.facebook, connected: true },
      }));
      setSaveMessage("✓ Facebook conectado com sucesso!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleInstagramConnect = () => {
    if (config.instagram.accessToken && config.instagram.businessAccountId) {
      setConfig((prev) => ({
        ...prev,
        instagram: { ...prev.instagram, connected: true },
      }));
      setSaveMessage("✓ Instagram conectado com sucesso!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleDisconnect = (platform: "whatsapp" | "facebook" | "instagram") => {
    setConfig((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], connected: false },
    }));
    setSaveMessage(`✓ ${platform} desconectado!`);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas integrações e preferências
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("integrations")}
            className={`pb-4 px-4 font-medium transition-colors ${
              activeTab === "integrations"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Integrações
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`pb-4 px-4 font-medium transition-colors ${
              activeTab === "notifications"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Notificações
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`pb-4 px-4 font-medium transition-colors ${
              activeTab === "security"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Segurança
          </button>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
            <CheckCircle size={20} />
            {saveMessage}
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === "integrations" && (
          <div className="space-y-6">
            {/* WhatsApp */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MessageCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      WhatsApp Business
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Conecte sua conta WhatsApp Business para receber mensagens
                    </p>
                  </div>
                </div>
                {config.whatsapp.connected ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle size={18} />
                    Conectado
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-muted-foreground font-medium">
                    <AlertCircle size={18} />
                    Desconectado
                  </span>
                )}
              </div>

              {!config.whatsapp.connected ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Número de Telefone
                    </label>
                    <Input
                      placeholder="+55 11 99999-9999"
                      value={config.whatsapp.phoneNumber}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          whatsapp: {
                            ...prev.whatsapp,
                            phoneNumber: e.target.value,
                          },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business Account ID
                    </label>
                    <Input
                      placeholder="Seu Business Account ID"
                      value={config.whatsapp.businessAccountId}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          whatsapp: {
                            ...prev.whatsapp,
                            businessAccountId: e.target.value,
                          },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Access Token
                    </label>
                    <Input
                      type="password"
                      placeholder="Seu token de acesso"
                      value={config.whatsapp.accessToken}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          whatsapp: {
                            ...prev.whatsapp,
                            accessToken: e.target.value,
                          },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <Button
                    onClick={handleWhatsAppConnect}
                    className="bg-green-600 hover:bg-green-700 w-full"
                  >
                    Conectar WhatsApp
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">
                    <strong>Número:</strong> {config.whatsapp.phoneNumber}
                  </p>
                  <Button
                    onClick={() => handleDisconnect("whatsapp")}
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive"
                  >
                    Desconectar
                  </Button>
                </div>
              )}
            </Card>

            {/* Facebook */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Facebook size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Facebook
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sincronize leads e mensagens do Facebook
                    </p>
                  </div>
                </div>
                {config.facebook.connected ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle size={18} />
                    Conectado
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-muted-foreground font-medium">
                    <AlertCircle size={18} />
                    Desconectado
                  </span>
                )}
              </div>

              {!config.facebook.connected ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Page ID
                    </label>
                    <Input
                      placeholder="Seu Facebook Page ID"
                      value={config.facebook.pageId}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          facebook: {
                            ...prev.facebook,
                            pageId: e.target.value,
                          },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Access Token
                    </label>
                    <Input
                      type="password"
                      placeholder="Seu token de acesso"
                      value={config.facebook.accessToken}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          facebook: {
                            ...prev.facebook,
                            accessToken: e.target.value,
                          },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <Button
                    onClick={handleFacebookConnect}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Conectar Facebook
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">
                    <strong>Page ID:</strong> {config.facebook.pageId}
                  </p>
                  <Button
                    onClick={() => handleDisconnect("facebook")}
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive"
                  >
                    Desconectar
                  </Button>
                </div>
              )}
            </Card>

            {/* Instagram */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <Instagram size={24} className="text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Instagram
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sincronize leads e mensagens do Instagram
                    </p>
                  </div>
                </div>
                {config.instagram.connected ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle size={18} />
                    Conectado
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-muted-foreground font-medium">
                    <AlertCircle size={18} />
                    Desconectado
                  </span>
                )}
              </div>

              {!config.instagram.connected ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business Account ID
                    </label>
                    <Input
                      placeholder="Seu Instagram Business Account ID"
                      value={config.instagram.businessAccountId}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          instagram: {
                            ...prev.instagram,
                            businessAccountId: e.target.value,
                          },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Access Token
                    </label>
                    <Input
                      type="password"
                      placeholder="Seu token de acesso"
                      value={config.instagram.accessToken}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          instagram: {
                            ...prev.instagram,
                            accessToken: e.target.value,
                          },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <Button
                    onClick={handleInstagramConnect}
                    className="bg-pink-600 hover:bg-pink-700 w-full"
                  >
                    Conectar Instagram
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">
                    <strong>Business Account ID:</strong> {config.instagram.businessAccountId}
                  </p>
                  <Button
                    onClick={() => handleDisconnect("instagram")}
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive"
                  >
                    Desconectar
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <Card className="p-6 bg-card border-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Notificações de Novos Leads
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas quando novos leads chegarem
                    </p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Notificações de Mensagens
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas de novas mensagens
                    </p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Notificações por Email
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Envie resumos diários por email
                    </p>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <Card className="p-6 bg-card border-border">
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Lock size={20} className="text-primary" />
                  <h4 className="font-medium text-foreground">
                    Alterar Senha
                  </h4>
                </div>
                <div className="space-y-3">
                  <Input
                    type="password"
                    placeholder="Senha atual"
                    className="bg-input border-border"
                  />
                  <Input
                    type="password"
                    placeholder="Nova senha"
                    className="bg-input border-border"
                  />
                  <Input
                    type="password"
                    placeholder="Confirmar nova senha"
                    className="bg-input border-border"
                  />
                  <Button className="bg-primary hover:bg-primary/90 w-full">
                    Atualizar Senha
                  </Button>
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-3">
                  Autenticação de Dois Fatores
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione uma camada extra de segurança à sua conta
                </p>
                <Button variant="outline" className="w-full">
                  Ativar 2FA
                </Button>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
