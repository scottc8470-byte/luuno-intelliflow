import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center">
            <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground glow-hover" />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}