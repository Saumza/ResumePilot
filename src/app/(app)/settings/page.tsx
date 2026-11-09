"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";

export default function SettingsPage() {

    const { data: session, status } = useSession()
    const user: User = session?.user as User

    return (
        status === "loading" ?
            <div
                role="status"
                aria-live="polite"
                className="flex min-h-screen w-full flex-col items-center justify-center gap-7 bg-background px-6 text-foreground"
            >
                <div className="flex items-center gap-3">
                    <span className="size-4 rounded-[5px] bg-accent" aria-hidden />
                    <span className="text-2xl font-bold tracking-tight">Resume Auto</span>
                </div>
                <div className="relative h-1 w-56 overflow-hidden rounded-full bg-surface-raised" role="status" aria-hidden>
                    <div className="loading-bar absolute inset-y-0 w-2/5 rounded-full bg-accent" />
                </div>
            </div>
            :
            < div >
                <h1 className="heading-1 text-foreground text-3xl font-semibold">Settings</h1>
                <p className="mt-2 text-muted">Manage your account.</p>

                <div className="mt-7 flex max-w-xl flex-col gap-5">
                    {/* Card 1 — account */}
                    <Card className="border-border bg-surface shadow-none">
                        <CardHeader><CardTitle className="heading-3">Account</CardTitle></CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between border-b border-border py-3.5">
                                <span className="text-sm text-muted">Username</span>
                                <span className="text-[15px] font-medium text-foreground">{user.name}</span>
                            </div>
                            <div className="flex items-center justify-between py-3.5">
                                <span className="text-sm text-muted">Email</span>
                                <span className="text-[15px] font-medium text-foreground">{user.email}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2 — sign out */}
                    <Card className="border-border bg-surface shadow-none">
                        <CardHeader><CardTitle className="heading-3">Sign out</CardTitle></CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-muted">Sign out of Resume Auto on this device.</p>
                            <Button
                                variant="outline"
                                className="mt-4 h-10 gap-2 border-border-strong bg-transparent text-foreground hover:bg-surface-raised"
                                onClick={() => signOut()}
                            >
                                <LogOut className="size-4" /> Sign out
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div >
    );
}