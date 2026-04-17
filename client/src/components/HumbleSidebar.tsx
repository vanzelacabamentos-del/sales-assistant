import { useLocation } from "wouter";
import { useState, useEffect } from "react";
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
  { icon: <Users size={20} />, label: "Vendedores", path: "/sellers" },
  { icon: <Settings size={20} />, label: "Configurações", path: "/settings" },
];

export default function HumbleSidebar() {
  const [, navigate] = useLocation();
  const [currentPath, setCurrentPath] = useState("/");
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById("humble-sidebar");
      const toggle = document.getElementById("sidebar-toggle");
      
      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(e.target as Node) &&
        toggle &&
        !toggle.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 hover:bg-muted rounded-lg bg-primary text-white md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Floating/Overlay */}
      <aside
        id="humble-sidebar"
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground z-40 overflow-hidden flex flex-col border-r border-sidebar-border transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
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
    </>
  );
}
