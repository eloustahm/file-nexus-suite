
import { useState } from "react";
import {Button} from "@/components/ui/button";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    const {state} = useSidebar();
    const collapsed = state === "collapsed";
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const { toast } = useToast();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            toast({
                title: "Files uploaded",
                description: `Successfully uploaded ${files.length} file(s)`,
            });
            setIsUploadOpen(false);
        }
    };

    return (
        <Sidebar collapsible="icon">
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
                    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full mb-6">
                                <Plus className="h-4 w-4 mr-2"/>
                                New Document
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload New Document</DialogTitle>
                                <DialogDescription>
                                    Choose files to upload to your workspace
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="document-upload">Select Files</Label>
                                    <Input
                                        id="document-upload"
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        className="mt-1"
                                        accept=".pdf,.doc,.docx,.txt,.xlsx,.pptx"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Upload className="h-4 w-4 text-gray-400" />
                                    <p className="text-sm text-gray-500">
                                        Supported formats: PDF, DOC, DOCX, TXT, XLSX, PPTX
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </SidebarHeader>

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
