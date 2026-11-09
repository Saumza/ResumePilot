'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Briefcase, KanbanSquare, User as UserIcon, Settings, LogOut } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";


export function AppSidebar() {
    const NAV = [
        { title: "Home", href: "/home", icon: Home },
        { title: "Documents", href: "/documents", icon: FileText },
        { title: "Jobs", href: "/jobs", icon: Briefcase },
        { title: "Applications", href: "/applications", icon: KanbanSquare },
        { title: "Profile", href: "/profile", icon: UserIcon },
    ];

    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" className="border-r border-border bg-surface">
            <SidebarHeader className="px-3 py-4">
                <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
                    <Link
                        href="/home"
                        className="flex items-center gap-2.5 px-1 group-data-[collapsible=icon]:hidden"
                    >
                        <span className="size-3.5 shrink-0 rounded-sm bg-accent" aria-hidden />
                        <span className="heading-3 text-foreground">Resume Auto</span>
                    </Link>
                    <SidebarTrigger className="text-muted hover:text-foreground" />
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarMenu>
                    {NAV.map((item) => {
                        const active = pathname.startsWith(item.href);
                        return (
                            <SidebarMenuItem key={item.href} className="py-2.5 items">
                                <SidebarMenuButton
                                    asChild
                                    isActive={active}
                                    className="data-[active=true]:bg-accent-soft data-[active=true]:text-accent-text"
                                >
                                    <Link href={item.href}>
                                        <item.icon className="size-5!" strokeWidth={1.6} />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            {/* Settings + user block pinned at the bottom */}
            <SidebarFooter className="p-3">
                <div className="py-5">
                    <SidebarMenuButton>
                        <Link
                            href="/settings"
                            className="flex h-9 items-center gap-3 rounded-md text-sm font-medium text-muted hover:text-foreground"
                        >
                            <Settings className="size-4.5" strokeWidth={1.6} /> Settings
                        </Link>
                    </SidebarMenuButton>
                </div>
            </SidebarFooter>
        </Sidebar>
    )

}
