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
  Zap,
  Menu,
  X,
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
  { icon: <Zap size={20} />, label: "Leads", path: "/leads" },
  { icon: <Users size={20} />, label: "Vendedores", path: "/sellers" },
  { icon: <Settings size={20} />, label: "Configurações", path: "/settings" },
];

export default function MobileMenu() {
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  const handleNavigate = (path: string) => {
    navigate(path);
    setCurrentPath(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white z-40 flex items-center justify-between px-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="font-bold text-sm">S</span>
          </div>
          <h1 className="font-bold text-lg">Sales AI</h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed left-0 top-16 bottom-0 w-64 bg-sidebar text-sidebar-foreground z-30 overflow-y-auto transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                currentPath === item.path
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/20"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border mt-auto">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-sidebar-accent/20 transition-colors">
            <LogOut size={20} />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </nav>

      {/* Mobile Content Padding */}
      <div className="md:hidden h-16" />
    </>
  );
}
