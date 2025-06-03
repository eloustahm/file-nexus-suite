
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarMain } from "@/pages/components/Sidebar";
import { Outlet } from "react-router-dom";
import { UserMenu } from "@/components/UserMenu";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { HeaderSearch } from "@/components/HeaderSearch";
import { useAuthStore } from "@/store/useAuthStore";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface AuthenticatedLayoutProps {
  user?: User | null;
}

export const AuthenticatedLayout = ({ user: propUser }: AuthenticatedLayoutProps) => {
  const { user: storeUser } = useAuthStore();
  
  // Use prop user if provided, otherwise use store user
  const user = propUser || storeUser;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const userForDisplay = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  };

  return (
    <SidebarProvider>
      <div className="w-full min-h-screen bg-gray-50 flex">
        <SidebarMain user={userForDisplay} />
        <SidebarInset>
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
                <HeaderSearch />
              </div>
              <div className="flex items-center gap-3">
                <NotificationsDropdown />
                <UserMenu user={userForDisplay} />
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
