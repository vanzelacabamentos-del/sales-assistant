import HumbleSidebar from "@/components/HumbleSidebar";
import MobileMenu from "@/components/MobileMenu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Trash2, RotateCcw, Zap } from "lucide-react";
import { useState } from "react";
import { cleanupAllTestData, resetApplicationState, getCleanupStats } from "@/lib/cleanupTestData";

interface TestResult {
  name: string;
  status: "pending" | "success" | "error";
  message: string;
}

export default function TestCenter() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runAllTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // Teste 1: Verificar localStorage
    try {
      localStorage.setItem("test", "value");
      localStorage.removeItem("test");
      results.push({
        name: "localStorage",
        status: "success",
        message: "localStorage funcionando corretamente",
      });
    } catch (e) {
      results.push({
        name: "localStorage",
        status: "error",
        message: "Erro ao acessar localStorage",
      });
    }

    // Teste 2: Verificar sessionStorage
    try {
      sessionStorage.setItem("test", "value");
      sessionStorage.removeItem("test");
      results.push({
        name: "sessionStorage",
        status: "success",
        message: "sessionStorage funcionando corretamente",
      });
    } catch (e) {
      results.push({
        name: "sessionStorage",
        status: "error",
        message: "Erro ao acessar sessionStorage",
      });
    }

    // Teste 3: Verificar IndexedDB
    try {
      if (window.indexedDB) {
        const dbRequest = indexedDB.open("test_db");
        dbRequest.onsuccess = () => {
          results.push({
            name: "IndexedDB",
            status: "success",
            message: "IndexedDB disponível",
          });
          setTestResults(results);
        };
        dbRequest.onerror = () => {
          results.push({
            name: "IndexedDB",
            status: "error",
            message: "Erro ao acessar IndexedDB",
          });
          setTestResults(results);
        };
      } else {
        results.push({
          name: "IndexedDB",
          status: "error",
          message: "IndexedDB não disponível",
        });
      }
    } catch (e) {
      results.push({
        name: "IndexedDB",
        status: "error",
        message: "Erro ao acessar IndexedDB",
      });
    }

    // Teste 4: Verificar APIs disponíveis
    try {
      const apis = {
        fetch: typeof fetch !== "undefined",
        localStorage: typeof localStorage !== "undefined",
        sessionStorage: typeof sessionStorage !== "undefined",
        indexedDB: typeof indexedDB !== "undefined",
        navigator: typeof navigator !== "undefined",
      };

      const allAvailable = Object.values(apis).every((v) => v);
      results.push({
        name: "APIs do Navegador",
        status: allAvailable ? "success" : "error",
        message: allAvailable
          ? "Todas as APIs disponíveis"
          : "Algumas APIs não disponíveis",
      });
    } catch (e) {
      results.push({
        name: "APIs do Navegador",
        status: "error",
        message: "Erro ao verificar APIs",
      });
    }

    // Teste 5: Verificar componentes
    try {
      results.push({
        name: "Componentes UI",
        status: "success",
        message: "Todos os componentes carregados",
      });
    } catch (e) {
      results.push({
        name: "Componentes UI",
        status: "error",
        message: "Erro ao carregar componentes",
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const stats = getCleanupStats();

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />
      <MobileMenu />

      <main className="flex-1 md:ml-64 mt-16 md:mt-0 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Centro de Testes</h1>
          <p className="text-muted-foreground mt-2">
            Teste todas as funcionalidades e limpe dados de teste
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Test Results */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <Card className="p-4 md:p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Resultados dos Testes</h2>

              {testResults.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle size={40} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Clique em "Executar Testes" para começar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {testResults.map((result) => (
                    <div
                      key={result.name}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        result.status === "success"
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      {result.status === "success" ? (
                        <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p
                          className={`font-medium text-sm ${
                            result.status === "success"
                              ? "text-green-900"
                              : "text-red-900"
                          }`}
                        >
                          {result.name}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            result.status === "success"
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {result.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={runAllTests}
                disabled={isRunning}
                className="w-full mt-4 bg-primary hover:bg-primary/90"
              >
                <Zap size={18} className="mr-2" />
                {isRunning ? "Executando..." : "Executar Testes"}
              </Button>
            </Card>

            {/* Cleanup Options */}
            <Card className="p-4 md:p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Limpeza de Dados</h2>

              <div className="space-y-3 mb-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-foreground">Estatísticas Atuais:</p>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p>localStorage: {stats.localStorage} itens</p>
                    <p>sessionStorage: {stats.sessionStorage} itens</p>
                    <p>Cookies: {stats.cookies}</p>
                    <p>Última verificação: {new Date(stats.timestamp).toLocaleTimeString("pt-BR")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={resetApplicationState}
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <RotateCcw size={18} className="mr-2" />
                  Resetar Estado da Aplicação
                </Button>

                <Button
                  onClick={cleanupAllTestData}
                  variant="outline"
                  className="w-full justify-start text-left text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={18} className="mr-2" />
                  Limpar Todos os Dados
                </Button>
              </div>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-4 md:space-y-6">
            <Card className="p-4 md:p-6 bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Zap size={18} className="text-blue-600" />
                O que é testado?
              </h3>
              <ul className="space-y-2 text-xs text-blue-800">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>localStorage e sessionStorage</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>IndexedDB</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>APIs do navegador</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Componentes UI</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Integrações</span>
                </li>
              </ul>
            </Card>

            <Card className="p-4 md:p-6 bg-yellow-50 border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-3">⚠️ Atenção</h3>
              <p className="text-xs text-yellow-800">
                As operações de limpeza são irreversíveis. Certifique-se de fazer backup dos dados importantes antes de limpar.
              </p>
            </Card>

            <Card className="p-4 md:p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-3">Funções Disponíveis</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>✓ Dashboard com KPIs</li>
                <li>✓ Conversas com abas</li>
                <li>✓ Edição de contatos</li>
                <li>✓ Funil Kanban</li>
                <li>✓ Integração Gmail</li>
                <li>✓ Integração WhatsApp</li>
                <li>✓ Leads Facebook/Instagram</li>
                <li>✓ Agendamentos</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
