
import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Users,
  Settings,
  MessageSquare,
  Wand2,
  Share2,
  Activity,
  UserPlus,
  Brain,
  Zap,
  CreditCard,
} from "lucide-react";

const menuItems = [
  {id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard"},
  {id: "documents", label: "Documents", icon: FileText, badge: "125", path: "/dashboard/documents"},
  {id: "chat", label: "Chat with Documents", icon: MessageSquare, path: "/dashboard/chats"},
  {id: "generate", label: "Generate Document", icon: Wand2, path: "/dashboard/generate"},
  {id: "workflow", label: "Workflow", icon: Settings, path: "/dashboard/workflow"},
  {id: "folders", label: "Folders", icon: Folder, path: "/dashboard/folders"},
  {id: "shared", label: "Shared with me", icon: Users, path: "/dashboard/shared"},
  {id: "sharing", label: "Document Sharing", icon: Share2, path: "/dashboard/sharing"},
  {id: "activity", label: "Activity Logs", icon: Activity, path: "/dashboard/activity"},
  {id: "team", label: "Team Collaboration", icon: UserPlus, path: "/dashboard/team"},
  {id: "ai-modules", label: "AI Modules", icon: Brain, path: "/dashboard/ai-modules"},
  {id: "integrations", label: "Integrations", icon: Zap, path: "/dashboard/integrations"},
  {id: "pricing", label: "Pricing Plans", icon: CreditCard, path: "/dashboard/pricing"},
  {id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings"},
];

interface SidebarContentProps {
  collapsed: boolean;
}

export const SidebarContent = ({ collapsed }: SidebarContentProps) => {
  const location = useLocation();

  return (
    <SidebarMenu>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className="w-full"
            >
              <Link to={item.path}>
                <item.icon className="h-4 w-4 mr-3"/>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </SidebarMenuButton>
            {!collapsed && item.badge && (
              <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
