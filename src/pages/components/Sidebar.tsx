
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Users,
  Settings,
  LogOut,
  Plus,
  MessageSquare,
  Wand2
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}

export const Sidebar = ({ activeView, onViewChange, user }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "documents", label: "Documents", icon: FileText, badge: "125" },
    { id: "chat", label: "Chat with Documents", icon: MessageSquare },
    { id: "generate", label: "Generate Document", icon: Wand2 },
    { id: "workflow", label: "Workflow", icon: Settings },
    { id: "folders", label: "Folders", icon: Folder },
    { id: "shared", label: "Shared with me", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "login", label: "Login", icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">DocuFlow</span>
        </div>

        <Button className="w-full mb-6" onClick={() => onViewChange("upload")}>
          <Plus className="h-4 w-4 mr-2" />
          New Document
        </Button>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
};
