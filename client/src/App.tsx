import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AIChatAssistant from "@/components/AIChatAssistant";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Conversations from "./pages/Conversations";
import ConversationDetail from "./pages/ConversationDetail";
import Labels from "./pages/Labels";
import Sellers from "./pages/Sellers";
import Metrics from "./pages/Metrics";
import Settings from "./pages/Settings";
import Contacts from "./pages/Contacts";
import Schedule from "./pages/Schedule";
import Departments from "./pages/Departments";
import SalesFunnel from "./pages/SalesFunnel";
import SalesFunnelKanban from "./pages/SalesFunnelKanban";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/conversations" component={Conversations} />
      <Route path="/conversation/:id" component={ConversationDetail} />
      <Route path="/labels" component={Labels} />
      <Route path="/sellers" component={Sellers} />
      <Route path="/metrics" component={Metrics} />
      <Route path="/settings" component={Settings} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/departments" component={Departments} />
      <Route path="/sales-funnel" component={SalesFunnel} />
      <Route path="/sales-funnel-kanban" component={SalesFunnelKanban} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <AIChatAssistant />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
