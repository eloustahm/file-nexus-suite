
import {
  Sidebar,
  SidebarHeader as UISidebarHeader,
  SidebarContent as UISidebarContent,
  SidebarFooter as UISidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./Sidebar/SidebarHeader";
import { SidebarContent } from "./Sidebar/SidebarContent";
import { SidebarFooter } from "./Sidebar/SidebarFooter";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}

export const SidebarMain = ({ user }: SidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <UISidebarHeader>
        <SidebarHeader collapsed={collapsed} />
      </UISidebarHeader>

      <UISidebarContent className="px-6">
        <SidebarContent collapsed={collapsed} />
      </UISidebarContent>

      <UISidebarFooter>
        <SidebarFooter user={user} collapsed={collapsed} />
      </UISidebarFooter>
    </Sidebar>
  );
};
