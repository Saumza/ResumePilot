import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


export function ApplicationsCard() {
    return (
        <Card className={`border-border bg-surface shadow-none lg:col-span-7`}>
            <CardHeader className="flex items-center justify-between space-y-0">
                <CardTitle className="heading-3">Applications</CardTitle>
                <Link href="/applications" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                    View All →
                </Link>
            </CardHeader>
            <CardContent>
                <div>
                    {[
                        { co: "Stripe", role: "Sr. Software Engineer", status: "Applied", cls: "bg-accent-soft text-accent-text" },
                        { co: "Linear", role: "Backend Engineer", status: "Interview", cls: "bg-success/15 text-success" },
                    ].map((r) => (
                        <div key={r.co} className="flex items-center justify-between border-t border-border py-3 first:border-t-0">
                            <div>
                                <p className="font-semibold text-foreground">{r.co}</p>
                                <p className="text-sm text-muted">{r.role}</p>
                            </div>
                            <Badge className={`rounded-full border-0 font-mono text-[11px] ${r.cls}`}>{r.status}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}