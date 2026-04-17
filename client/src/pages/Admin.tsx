import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HumbleSidebar from "@/components/HumbleSidebar";
import { testDataCleaner } from "@/lib/testDataCleaner";
import { Trash2, RefreshCw, Plus, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface CleanupLog {
  timestamp: string;
  action: string;
  itemsCleaned: number;
  success: boolean;
}

export default function Admin() {
  const [logs, setLogs] = useState<CleanupLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleClearLocalStorage = async () => {
    setIsLoading(true);
    try {
      const result = testDataCleaner.clearLocalStorage();
      setLogs((prev) => [
        {
          timestamp: new Date().toISOString(),
          action: "Clear LocalStorage",
          itemsCleaned: result.itemsCleaned,
          success: result.success,
        },
        ...prev,
      ]);
      setMessage({
        type: "success",
        text: `✓ ${result.itemsCleaned} itens removidos do LocalStorage`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Erro ao limpar LocalStorage: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSessionStorage = async () => {
    setIsLoading(true);
    try {
      const result = testDataCleaner.clearSessionStorage();
      setLogs((prev) => [
        {
          timestamp: new Date().toISOString(),
          action: "Clear SessionStorage",
          itemsCleaned: result.itemsCleaned,
          success: result.success,
        },
        ...prev,
      ]);
      setMessage({
        type: "success",
        text: `✓ ${result.itemsCleaned} itens removidos do SessionStorage`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Erro ao limpar SessionStorage: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAuthData = () => {
    setIsLoading(true);
    try {
      const result = testDataCleaner.resetAuthData();
      setLogs((prev) => [
        {
          timestamp: new Date().toISOString(),
          action: "Reset Auth Data",
          itemsCleaned: result.itemsCleaned,
          success: result.success,
        },
        ...prev,
      ]);
      setMessage({
        type: "success",
        text: `✓ Dados de autenticação resetados`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Erro ao resetar dados de autenticação: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetApiCache = () => {
    setIsLoading(true);
    try {
      const result = testDataCleaner.resetApiCache();
      setLogs((prev) => [
        {
          timestamp: new Date().toISOString(),
          action: "Reset API Cache",
          itemsCleaned: result.itemsCleaned,
          success: result.success,
        },
        ...prev,
      ]);
      setMessage({
        type: "success",
        text: `✓ Cache de API resetado`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Erro ao resetar cache: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTestData = () => {
    setIsLoading(true);
    try {
      testDataCleaner.generateTestData();
      setLogs((prev) => [
        {
          timestamp: new Date().toISOString(),
          action: "Generate Test Data",
          itemsCleaned: 1,
          success: true,
        },
        ...prev,
      ]);
      setMessage({
        type: "success",
        text: `✓ Dados de teste gerados com sucesso`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Erro ao gerar dados de teste: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFullCleanup = async () => {
    if (!window.confirm("Tem certeza que deseja fazer limpeza completa?")) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await testDataCleaner.fullCleanup();
      setLogs((prev) => [
        {
          timestamp: new Date().toISOString(),
          action: "Full Cleanup",
          itemsCleaned: result.totalCleaned,
          success: result.totalFailed === 0,
        },
        ...prev,
      ]);
      setMessage({
        type: "success",
        text: `✓ Limpeza completa realizada: ${result.totalCleaned} itens removidos`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Erro durante limpeza completa: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Administração
          </h1>
          <p className="text-muted-foreground">
            Gerenciar dados de teste e limpeza
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <Card
            className={`p-4 mb-6 border-l-4 ${
              message.type === "success"
                ? "bg-green-50 border-green-500 text-green-900"
                : "bg-red-50 border-red-500 text-red-900"
            }`}
          >
            <div className="flex items-center gap-3">
              {message.type === "success" ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <p>{message.text}</p>
            </div>
          </Card>
        )}

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Limpeza de Dados
            </h3>
            <div className="space-y-3">
              <Button
                onClick={handleClearLocalStorage}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 gap-2"
              >
                <Trash2 size={18} />
                Limpar LocalStorage
              </Button>
              <Button
                onClick={handleClearSessionStorage}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 gap-2"
              >
                <Trash2 size={18} />
                Limpar SessionStorage
              </Button>
              <Button
                onClick={handleResetAuthData}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 gap-2"
              >
                <RefreshCw size={18} />
                Resetar Dados de Auth
              </Button>
              <Button
                onClick={handleResetApiCache}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 gap-2"
              >
                <RefreshCw size={18} />
                Resetar Cache de API
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Dados de Teste
            </h3>
            <div className="space-y-3">
              <Button
                onClick={handleGenerateTestData}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 gap-2"
              >
                <Plus size={18} />
                Gerar Dados de Teste
              </Button>
              <Button
                onClick={handleFullCleanup}
                disabled={isLoading}
                variant="outline"
                className="w-full gap-2 border-destructive text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={18} />
                Limpeza Completa
              </Button>
            </div>
          </Card>
        </div>

        {/* Storage Info */}
        <Card className="p-6 bg-card border-border mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Informações de Armazenamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                LocalStorage
              </p>
              <p className="text-2xl font-bold text-foreground">
                {Object.keys(localStorage).length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">itens</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                SessionStorage
              </p>
              <p className="text-2xl font-bold text-foreground">
                {Object.keys(sessionStorage).length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">itens</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Cookies</p>
              <p className="text-2xl font-bold text-foreground">
                {document.cookie.split(";").length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">itens</p>
            </div>
          </div>
        </Card>

        {/* Cleanup Logs */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Histórico de Limpeza
          </h3>
          {logs.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhuma ação registrada
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {log.success ? (
                      <CheckCircle size={18} className="text-green-600" />
                    ) : (
                      <AlertCircle size={18} className="text-red-600" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">
                        {log.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {log.itemsCleaned} itens
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
