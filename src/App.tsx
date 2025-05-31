import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import {AppRoutes} from "@/routes/AppRoutes.tsx";

const queryClient = new QueryClient();
const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "Editor",
    avatar: "/placeholder.svg",
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <AppRoutes user={user} />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
