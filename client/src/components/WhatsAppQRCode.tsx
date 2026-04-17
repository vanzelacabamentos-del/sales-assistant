import { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, CheckCircle, AlertCircle, Loader, Download } from "lucide-react";

interface WhatsAppQRCodeProps {
  onConnected?: (phoneNumber: string) => void;
  onError?: (error: string) => void;
}

type ConnectionStatus = "idle" | "generating" | "waiting" | "connected" | "error";

export default function WhatsAppQRCode({ onConnected, onError }: WhatsAppQRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [expiresIn, setExpiresIn] = useState<number>(60);
  const [copied, setCopied] = useState(false);

  // Gerar QR code
  const generateQRCode = () => {
    setStatus("generating");
    
    // Simular geração de QR code (em produção, seria uma chamada à API)
    const qrData = `https://wa.me/qr?code=${Math.random().toString(36).substring(7)}&expires=${Date.now() + 60000}`;
    
    const qr = new QRCodeStyling({
      width: 256,
      height: 256,
      data: qrData,
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      dotsOptions: {
        color: "#000000",
        type: "square",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "square",
      },
      cornersDotOptions: {
        type: "square",
      },
    });

    setQrCode(qr);
    setStatus("waiting");
    setExpiresIn(60);

    // Renderizar QR code
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }

    // Simular contagem regressiva
    const interval = setInterval(() => {
      setExpiresIn((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatus("idle");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Simular verificação de conexão
  useEffect(() => {
    if (status === "waiting" && expiresIn > 0) {
      // Simular verificação periódica (em produção, seria WebSocket ou polling)
      const checkInterval = setInterval(() => {
        if (Math.random() > 0.8) {
          setStatus("connected");
          setPhoneNumber("+55 11 99999-9999");
          onConnected?.("+55 11 99999-9999");
          clearInterval(checkInterval);
        }
      }, 3000);

      return () => clearInterval(checkInterval);
    }
  }, [status, expiresIn, onConnected]);

  const handleCopyQRCode = () => {
    if (qrCode) {
      const canvas = qrRef.current?.querySelector("canvas") as HTMLCanvasElement;
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        });
      }
    }
  };

  const handleDownloadQRCode = () => {
    if (qrCode) {
      qrCode.download({ name: "whatsapp-qr-code", extension: "png" });
    }
  };

  const handleDisconnect = () => {
    setStatus("idle");
    setQrCode(null);
    setPhoneNumber("");
    setExpiresIn(60);
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 bg-card border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Conectar WhatsApp</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Escaneie o código QR com seu telefone para conectar sua conta WhatsApp Business
        </p>

        {/* Status Indicator */}
        <div className="mb-6 p-4 rounded-lg bg-muted border border-border">
          <div className="flex items-center gap-3">
            {status === "idle" && (
              <>
                <AlertCircle size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Desconectado</p>
                  <p className="text-xs text-muted-foreground">Clique em "Gerar QR Code" para conectar</p>
                </div>
              </>
            )}
            {status === "generating" && (
              <>
                <Loader size={20} className="text-primary animate-spin" />
                <div>
                  <p className="font-medium text-foreground">Gerando QR Code...</p>
                  <p className="text-xs text-muted-foreground">Aguarde um momento</p>
                </div>
              </>
            )}
            {status === "waiting" && (
              <>
                <Loader size={20} className="text-blue-500 animate-spin" />
                <div>
                  <p className="font-medium text-foreground">Aguardando conexão</p>
                  <p className="text-xs text-muted-foreground">
                    Escaneie o QR Code com seu WhatsApp (expira em {expiresIn}s)
                  </p>
                </div>
              </>
            )}
            {status === "connected" && (
              <>
                <CheckCircle size={20} className="text-green-500" />
                <div>
                  <p className="font-medium text-foreground">Conectado</p>
                  <p className="text-xs text-muted-foreground">{phoneNumber}</p>
                </div>
              </>
            )}
            {status === "error" && (
              <>
                <AlertCircle size={20} className="text-red-500" />
                <div>
                  <p className="font-medium text-foreground">Erro na conexão</p>
                  <p className="text-xs text-muted-foreground">Tente novamente</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* QR Code Display */}
        {(status === "waiting" || status === "connected") && (
          <div className="mb-6 flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg border-2 border-border">
              <div ref={qrRef} className="w-64 h-64" />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Abra o WhatsApp no seu telefone e escaneie este código
            </p>
          </div>
        )}

        {/* Instructions */}
        {status === "idle" && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm">Como conectar:</h3>
            <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
              <li>Clique em "Gerar QR Code"</li>
              <li>Abra o WhatsApp no seu telefone</li>
              <li>Vá para Configurações → Conectados</li>
              <li>Escaneie o código QR</li>
              <li>Pronto! Sua conta está conectada</li>
            </ol>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {status === "idle" && (
            <Button
              onClick={generateQRCode}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              <RefreshCw size={18} className="mr-2" />
              Gerar QR Code
            </Button>
          )}

          {(status === "waiting" || status === "generating") && (
            <>
              <Button
                onClick={generateQRCode}
                variant="outline"
                className="w-full"
              >
                <RefreshCw size={18} className="mr-2" />
                Gerar novo QR Code
              </Button>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="w-full"
              >
                Cancelar
              </Button>
            </>
          )}

          {status === "connected" && (
            <>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-900">
                  ✓ WhatsApp conectado com sucesso!
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Você pode começar a receber e enviar mensagens
                </p>
              </div>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Desconectar
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <Button
                onClick={generateQRCode}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <RefreshCw size={18} className="mr-2" />
                Tentar novamente
              </Button>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="w-full"
              >
                Cancelar
              </Button>
            </>
          )}
        </div>

        {/* QR Code Actions */}
        {qrCode && status !== "idle" && (
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <Button
              onClick={handleCopyQRCode}
              variant="outline"
              className="w-full text-xs"
            >
              <Copy size={14} className="mr-2" />
              {copied ? "Copiado!" : "Copiar QR Code"}
            </Button>
            <Button
              onClick={handleDownloadQRCode}
              variant="outline"
              className="w-full text-xs"
            >
              <Download size={14} className="mr-2" />
              Baixar QR Code
            </Button>
          </div>
        )}

        {/* Connection Info */}
        {status === "connected" && (
          <div className="mt-4 pt-4 border-t border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Telefone:</span>
              <span className="font-medium text-foreground">{phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium text-green-600">Ativo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Conectado em:</span>
              <span className="font-medium text-foreground">
                {new Date().toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
