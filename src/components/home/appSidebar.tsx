'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Briefcase, KanbanSquare, User as UserIcon, Settings, LogOut } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";

export function AppSidebar() {
    const NAV = [
        { title: "Home", href: "/home", icon: Home },
        { title: "Documents", href: "/documents", icon: FileText },
        { title: "Jobs", href: "/jobs", icon: Briefcase },
        { title: "Applications", href: "/applications", icon: KanbanSquare },
        { title: "Profile", href: "/profile", icon: UserIcon },
    ];

    const pathname = usePathname();

    const { data: session, status } = useSession()
    const user: User = session?.user as User

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
                            <SidebarMenuItem key={item.href} className="py-1">
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
                <div className="rounded-xl border border-border bg-background p-3">
                    <Link
                        href="/settings"
                        className="flex h-9 items-center gap-3 rounded-md px-1 text-sm font-medium text-muted hover:text-foreground"
                    >
                        <Settings className="size-4.5" strokeWidth={1.6} /> Settings
                    </Link>
                    <Separator className="my-2 bg-border" />
                    {/* use the useSession context provider to get the userData! */}
                    <div className="flex items-center gap-2.5">
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">{status === "loading" ? "" : user.name}</p>
                            <p className="truncate text-xs text-muted">{status === "loading" ? "" : user.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="mt-3 h-9 w-full justify-center gap-2 border-border-strong bg-transparent text-foreground hover:bg-surface-raised"
                        onClick={() => signOut()}
                    >
                        <LogOut className="size-3.75" /> Sign out
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )

}
