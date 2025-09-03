import { useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Users,
  Workflow,
  BarChart3,
  MessageSquare,
  BookOpen,
  Atom,
  Settings,
  Brain
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Luuno AI", url: "/luuno-ai", icon: Brain },
  { title: "AI Agents", url: "/ai-agents", icon: Bot },
  { title: "Workflows", url: "/workflows", icon: Workflow },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Community", url: "/community", icon: Users },
  { title: "Knowledge", url: "/knowledge", icon: BookOpen },
  { title: "Quantum", url: "/quantum", icon: Atom },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string) => {
    const baseClasses = "h-12 px-4 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 glow-hover";
    
    if (isActive(path)) {
      return `${baseClasses} bg-sidebar-accent text-sidebar-primary glow-border border border-sidebar-ring/30`;
    }
    
    return baseClasses;
  };

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-sidebar"} bg-sidebar border-r border-sidebar-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="pt-8">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(item.url)}
                      end={item.url === "/"}
                    >
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-sidebar-primary' : 'text-sidebar-foreground'}`} />
                      {!isCollapsed && (
                        <span className={`ml-3 font-medium ${isActive(item.url) ? 'text-sidebar-primary' : 'text-sidebar-foreground'}`}>
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}