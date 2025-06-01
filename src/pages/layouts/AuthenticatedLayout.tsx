
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarMain } from "@/pages/components/Sidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { HeaderSearch } from "@/components/HeaderSearch";

export const AuthenticatedLayout = ({ user }) => {
    return (
        <SidebarProvider>
            <div className="w-full min-h-screen bg-gray-50 flex">
                <SidebarMain user={user} />
                <SidebarInset>
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
                                <HeaderSearch />
                            </div>
                            <div className="flex items-center gap-3">
                                <NotificationsDropdown />
                                <UserMenu user={user} />
                            </div>
                        </div>
                    </header>

                    <div className="p-6">
                        <Outlet />
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};
