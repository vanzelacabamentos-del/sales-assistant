import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HumbleSidebar from "@/components/HumbleSidebar";
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
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";

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

const recentConversations = [
  { id: "1", name: "João Silva", message: "Qual é o preço do produto?", time: "10:30" },
  { id: "2", name: "Maria Santos", message: "Obrigada pela informação!", time: "09:15" },
  { id: "3", name: "Carlos Oliveira", message: "Gostaria de agendar uma reunião", time: "08:45" },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Bem-vindo ao Sales AI</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus size={18} />
              Nova Conversa
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Buscar conversas, contatos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-card border-border"
            />
            <button className="absolute right-3 top-3 p-1 hover:bg-muted rounded">
              <Filter size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-card border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total de Vendas</p>
                <p className="text-2xl font-bold text-foreground">R$ 125.4K</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Contatos Ativos</p>
                <p className="text-2xl font-bold text-foreground">342</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Conversas</p>
                <p className="text-2xl font-bold text-foreground">1,245</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-foreground">32.5%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="text-primary" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Vendas vs Contatos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EAFF" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" fill="#5B5EFF" />
                <Bar dataKey="contatos" fill="#7C7FFF" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Receita Semanal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EAFF" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5B5EFF"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Conversations */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Conversas Recentes</h3>
          <div className="space-y-3">
            {recentConversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      {conv.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{conv.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.message}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground ml-4">{conv.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
