import { useLocation } from "wouter";
import { useState } from "react";
import {
  MessageSquare,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  BarChart3,
  Inbox,
  LogOut,
  Home,
  Tag,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Dashboard", path: "/" },
  { icon: <MessageSquare size={20} />, label: "Conversas", path: "/conversations" },
  { icon: <Inbox size={20} />, label: "Gmail", path: "/gmail" },
  { icon: <Users size={20} />, label: "Contatos", path: "/contacts" },
  { icon: <Calendar size={20} />, label: "Agenda", path: "/schedule" },
  { icon: <BarChart3 size={20} />, label: "Métricas", path: "/metrics" },
  { icon: <TrendingUp size={20} />, label: "Funil", path: "/sales-funnel" },
  { icon: <Tag size={20} />, label: "Etiquetas", path: "/labels" },
  { icon: <Users size={20} />, label: "Vendedores", path: "/sellers" },
  { icon: <Settings size={20} />, label: "Configurações", path: "/settings" },
];

export default function HumbleSidebar() {
  const [, navigate] = useLocation();
  const [currentPath, setCurrentPath] = useState("/");

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground z-40 overflow-hidden flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-lg">S</span>
        </div>
        <h1 className="font-bold text-lg">Sales AI</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setCurrentPath(item.path);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentPath === item.path
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/20"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent/20 transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
