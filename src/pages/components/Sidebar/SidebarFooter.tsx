
import React from "react";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface SidebarFooterProps {
  user: User;
  collapsed: boolean;
}

export const SidebarFooter = ({ user, collapsed }: SidebarFooterProps) => {
  return (
    <div className="p-6 border-t border-gray-200 mt-auto">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        )}
      </div>
      {!collapsed && (
        <SidebarMenuButton asChild className="w-full">
          <Link to="/logout">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600"
            >
              <LogOut className="h-4 w-4 mr-2"/>
              Sign out
            </Button>
          </Link>
        </SidebarMenuButton>
      )}
    </div>
  );
};
