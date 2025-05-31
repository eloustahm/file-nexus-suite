import {Button} from "@/components/ui/button";
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
    SidebarTrigger,
    useSidebar, // <-- Import collapse state hook
} from "@/components/ui/sidebar";

import {useLocation, Link} from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    Folder,
    Users,
    Settings,
    LogOut,
    Plus,
    MessageSquare,
    Wand2,
} from "lucide-react";

interface SidebarProps {
    user: {
        name: string;
        email: string;
        role: string;
        avatar: string;
    };
}

const menuItems = [
    {id: "dashboard", label: "Dashboard", icon: LayoutDashboard},
    {id: "documents", label: "Documents", icon: FileText, badge: "125"},
    {id: "chat", label: "Chat with Documents", icon: MessageSquare},
    {id: "generate", label: "Generate Document", icon: Wand2},
    {id: "workflow", label: "Workflow", icon: Settings},
    {id: "folders", label: "Folders", icon: Folder},
    {id: "shared", label: "Shared with me", icon: Users},
    {id: "settings", label: "Settings", icon: Settings},
];

export const SidebarMain = ({user}: SidebarProps) => {
    const location = useLocation();
    const {collapsed} = useSidebar();


    return (

        <Sidebar
            collapsible={'offcanvas'}
            // className={`fixed left-0 top-0 h-full z-50 bg-white border-r border-gray-200 transition-all overflow-hidden ${
            //     collapsed ? "w-16" : "w-64"
            // }`}
        >
            <SidebarHeader className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white"/>
                        </div>
                        {!collapsed && (
                            <span className="text-xl font-bold text-gray-900">
                  DocuFlow
                </span>
                        )}
                    </div>
                    <SidebarTrigger/>
                </div>

                {!collapsed && (
                    <SidebarMenuButton asChild className="w-full mb-6">
                        <Link to="/upload">
                            <Button className="w-full">
                                <Plus className="h-4 w-4 mr-2"/>
                                New Document
                            </Button>
                        </Link>
                    </SidebarMenuButton>
                )}
            </SidebarHeader>

            {/* Menu */}
            <SidebarContent className="px-6">
                <SidebarMenu>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === `/${item.id}`;
                        return (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    className="w-full"
                                >
                                    <Link to={`/${item.id}`}>
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
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="p-6 border-t border-gray-200 mt-auto">
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
            </SidebarFooter>
        </Sidebar>

    );
};
