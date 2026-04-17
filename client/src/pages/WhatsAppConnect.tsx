import HumbleSidebar from "@/components/HumbleSidebar";
import MobileMenu from "@/components/MobileMenu";
import WhatsAppQRCode from "@/components/WhatsAppQRCode";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Zap } from "lucide-react";
import { useState } from "react";

export default function WhatsAppConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedPhone, setConnectedPhone] = useState("");

  const handleConnected = (phoneNumber: string) => {
    setIsConnected(true);
    setConnectedPhone(phoneNumber);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />
      <MobileMenu />

      <main className="flex-1 md:ml-64 mt-16 md:mt-0 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Conectar WhatsApp</h1>
          <p className="text-muted-foreground mt-2">
            Conecte sua conta WhatsApp Business para sincronizar mensagens e contatos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* QR Code Section */}
          <div className="lg:col-span-2">
            <WhatsAppQRCode onConnected={handleConnected} />
          </div>

          {/* Info Section */}
          <div className="space-y-4 md:space-y-6">
            {/* Benefits */}
            <Card className="p-4 md:p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Benefícios</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Sincronização automática</p>
                    <p className="text-xs text-muted-foreground">Receba mensagens em tempo real</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Gerenciamento centralizado</p>
                    <p className="text-xs text-muted-foreground">Todas as conversas em um lugar</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Atribuição de vendedores</p>
                    <p className="text-xs text-muted-foreground">Distribua leads automaticamente</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Notas e comentários</p>
                    <p className="text-xs text-muted-foreground">Colabore com sua equipe</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status */}
            {isConnected && (
              <Card className="p-4 md:p-6 bg-green-50 border border-green-200">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 text-sm">Conectado com sucesso!</h4>
                    <p className="text-xs text-green-700 mt-1">{connectedPhone}</p>
                    <p className="text-xs text-green-600 mt-2">
                      Você pode começar a receber mensagens agora
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {!isConnected && (
              <Card className="p-4 md:p-6 bg-blue-50 border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm">Não conectado</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      Gere um QR code para conectar sua conta WhatsApp
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Requirements */}
            <Card className="p-4 md:p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" />
                Requisitos
              </h3>
              <ul className="space-y-2 text-xs md:text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Conta WhatsApp Business ativa</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Número de telefone verificado</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Acesso a um smartphone</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Conexão de internet estável</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Perguntas Frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 md:p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Meus dados são seguros?</h3>
              <p className="text-sm text-muted-foreground">
                Sim! Usamos criptografia de ponta a ponta e não armazenamos suas mensagens no nosso servidor.
              </p>
            </Card>
            <Card className="p-4 md:p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Posso desconectar depois?</h3>
              <p className="text-sm text-muted-foreground">
                Sim, você pode desconectar sua conta a qualquer momento nas configurações.
              </p>
            </Card>
            <Card className="p-4 md:p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Quanto tempo leva para conectar?</h3>
              <p className="text-sm text-muted-foreground">
                Geralmente leva menos de 1 minuto. Basta escanear o QR code com seu WhatsApp.
              </p>
            </Card>
            <Card className="p-4 md:p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Preciso de um número diferente?</h3>
              <p className="text-sm text-muted-foreground">
                Você pode conectar múltiplas contas gerando novos QR codes para cada número.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
