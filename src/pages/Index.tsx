
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {Bell} from "lucide-react";
import {SidebarMain} from "./components/Sidebar";

import {AppRoutes} from "@/routes/AppRoutes.tsx";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const [user] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Editor",
    avatar: "/placeholder.svg"
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/*<SidebarMain activeView={activeView} onViewChange={setActiveView} user={user} />*/}
        <main className="flex-1 transition-all duration-300 ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {activeView}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">

          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
