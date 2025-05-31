import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarMain } from "@/pages/components/Sidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export const AuthenticatedLayout = ({ user }) => {

    return (
        <SidebarProvider>
            <div className="w-full min-h-screen bg-gray-50 flex">
                <SidebarMain user={user} />
                <main className="flex-1 w-full">
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
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
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};
