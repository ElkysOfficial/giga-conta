import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import Wallets from "./pages/Wallets";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProfileProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/transacoes" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/carteiras" element={<ProtectedRoute><Wallets /></ProtectedRoute>} />
            <Route path="/projetos" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/orcamento" element={<ProtectedRoute><Wallets /></ProtectedRoute>} />
            <Route path="/fornecedores" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/centros-custo" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/relatorios" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/configuracoes" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProfileProvider>
  </QueryClientProvider>
);

export default App;
