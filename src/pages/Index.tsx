
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Upload,
  Search,
  Grid3X3,
  List,
  Filter,
  Plus,
  Folder,
  Download,
  Edit,
  Share,
  MoreVertical,
  User,
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Clock,
  TrendingUp
} from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { Document } from "./components/Document/Document";
import { UserProfile } from "./components/UserProfile";
import { Dashboard } from "./components/Dashboard";
import { DocumentChat } from "./components/Document/DocumentChat";
import { DocumentGenerator } from "./components/Document/DocumentGenerator";
import { Workflow } from "./components/Workflow";
import { Settings } from "./components/Settings";
import { Shared } from "./components/Shared";
import { Folders } from "./components/Folders";



const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const [user] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Editor",
    avatar: "/placeholder.svg"
  });

  const renderMainContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "documents":
        return <Document/>;
      case "chat":
        return <DocumentChat />;
      case "generate":
        return <DocumentGenerator />;
      case "workflow":
        return <Workflow />;
      case "folders":
        return <Folders />;
      case "shared":
        return <Shared />;
      case "settings":
        return <Settings />;
      case "profile":
        return <UserProfile user={user} />;
      case "login":
        return <UserProfile user={user} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} user={user} />

        <main className="flex-1 lg:ml-64">
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
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
