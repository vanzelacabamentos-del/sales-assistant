import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";

const dashboardData = [
  { name: "Jan", vendas: 4000, contatos: 2400 },
  { name: "Fev", vendas: 3000, contatos: 1398 },
  { name: "Mar", vendas: 2000, contatos: 9800 },
  { name: "Abr", vendas: 2780, contatos: 3908 },
  { name: "Mai", vendas: 1890, contatos: 4800 },
  { name: "Jun", vendas: 2390, contatos: 3800 },
];

const revenueData = [
  { name: "Semana 1", revenue: 12000 },
  { name: "Semana 2", revenue: 15000 },
  { name: "Semana 3", revenue: 18000 },
  { name: "Semana 4", revenue: 22000 },
];

export default function Dashboard() {
  const [, navigate] = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: TrendingUp, path: "/" },
    { label: "Conversas", icon: MessageSquare, path: "/conversations" },
    { label: "Contatos", icon: Users, path: "/contacts" },
    { label: "Agendamentos", icon: Calendar, path: "/schedule" },
    { label: "Métricas", icon: TrendingUp, path: "/metrics" },
    { label: "Funil de Vendas", icon: TrendingUp, path: "/sales-funnel" },
    { label: "Kanban", icon: TrendingUp, path: "/sales-funnel-kanban" },
    { label: "Vendedores", icon: Users, path: "/sellers" },
    { label: "Departamentos", icon: Users, path: "/departments" },
    { label: "Etiquetas", icon: TrendingUp, path: "/labels" },
    { label: "Configurações", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">Sales AI</h1>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Dashboard</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total de Vendas
                  </p>
                  <p className="text-3xl font-bold text-foreground">R$ 125.4K</p>
                </div>
                <TrendingUp className="text-primary" size={32} />
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Contatos Ativos
                  </p>
                  <p className="text-3xl font-bold text-foreground">342</p>
                </div>
                <Users className="text-primary" size={32} />
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Conversas
                  </p>
                  <p className="text-3xl font-bold text-foreground">1,245</p>
                </div>
                <MessageSquare className="text-primary" size={32} />
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Taxa de Conversão
                  </p>
                  <p className="text-3xl font-bold text-foreground">32.5%</p>
                </div>
                <TrendingUp className="text-primary" size={32} />
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Vendas vs Contatos
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vendas" fill="#3b82f6" />
                  <Bar dataKey="contatos" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Receita Semanal
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-6 p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Atividades Recentes
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      Novo contato adicionado
                    </p>
                    <p className="text-sm text-muted-foreground">
                      João Silva - há 2 horas
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
