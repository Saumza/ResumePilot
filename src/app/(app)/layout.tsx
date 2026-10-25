import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/home/appSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen>
            <AppSidebar />
            <SidebarInset className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}