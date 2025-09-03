import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./components/views/Dashboard";
import LuunoAI from "./components/views/LuunoAI";
import AIAgents from "./components/views/AIAgents";
import Workflows from "./components/views/Workflows";
import Analytics from "./components/views/Analytics";
import Community from "./components/views/Community";
import Knowledge from "./components/views/Knowledge";
import Quantum from "./components/views/Quantum";
import Settings from "./components/views/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/luuno-ai" element={<LuunoAI />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/community" element={<Community />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/quantum" element={<Quantum />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
