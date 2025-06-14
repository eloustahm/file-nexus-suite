import { useAuth } from '@/hooks/useAuth';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarMain } from "@/pages/components/Sidebar";
import { HeaderSearch } from '@/components/HeaderSearch';
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import { UserMenu } from '@/components/UserMenu';
import { FullPageLoading } from '@/components/LoadingStates';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageLoading message="Loading your workspace..." />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Authentication required</p>
        </div>
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
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
