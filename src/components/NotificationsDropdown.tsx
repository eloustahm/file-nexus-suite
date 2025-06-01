
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, Users, MessageSquare, CheckCircle } from "lucide-react";

export const NotificationsDropdown = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "document",
      title: "Document shared with you",
      description: "Sarah Wilson shared 'Project Proposal.pdf'",
      time: "2 minutes ago",
      read: false,
      icon: FileText
    },
    {
      id: 2,
      type: "workflow",
      title: "Workflow step completed",
      description: "Legal review completed for Privacy Policy",
      time: "1 hour ago",
      read: false,
      icon: CheckCircle
    },
    {
      id: 3,
      type: "chat",
      title: "New chat message",
      description: "Mike Johnson: Can you review the contract?",
      time: "3 hours ago",
      read: true,
      icon: MessageSquare
    },
    {
      id: 4,
      type: "team",
      title: "Team invitation",
      description: "You've been added to Marketing Team",
      time: "1 day ago",
      read: true,
      icon: Users
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document": return "text-blue-600";
      case "workflow": return "text-green-600";
      case "chat": return "text-purple-600";
      case "team": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-white" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3 cursor-pointer">
              <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                <notification.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-xs text-gray-500">{notification.description}</p>
                <p className="text-xs text-gray-400">{notification.time}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
