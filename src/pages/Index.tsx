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
  Settings,
  LogOut,
  Bell,
  Clock,
  TrendingUp
} from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { DocumentGrid } from "./components/DocumentGrid";
import { DocumentUpload } from "./components/DocumentUpload";
import { UserProfile } from "./components/UserProfile";
import { Dashboard } from "./components/Dashboard";
import { DocumentChat } from "./components/DocumentChat";
import { DocumentGenerator } from "./components/DocumentGenerator";
import { Workflow } from "./components/Workflow";
import { Settings } from "./components/Settings";
import { Shared } from "./components/Shared";
import { Folders } from "./components/Folders";

type ViewMode = "grid" | "list";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
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
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                <p className="text-gray-600 mt-1">Manage and organize your documents</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="flex border rounded-lg">
                  <Button 
                    variant={viewMode === "grid" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <DocumentUpload />
              </div>
            </div>
            <DocumentGrid viewMode={viewMode} searchQuery={searchQuery} />
          </div>
        );
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
