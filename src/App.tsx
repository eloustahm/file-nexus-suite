
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { RequestProvider } from "@/contexts/RequestContext";
import { AppRoutes } from "@/routes/AppRoutes.tsx";

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
      <RequestProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
            <AppRoutes user={user} />
        </BrowserRouter>
      </RequestProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
