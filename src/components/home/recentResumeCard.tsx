import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const RESUMES = [
    { title: "Backend Engineer · Stripe", updated: "Updated 2 days ago", type: "Tailored", score: 88 },
    { title: "ML Engineer · Anthropic", updated: "Updated 3 days ago", type: "Tailored", score: 90 },
    { title: "Base resume", updated: "Updated 1 week ago", type: "Base", score: 82 },
];

export function RecentResumesCard({ className }: { className?: string }) {
    return (
        <Card className={`border-border bg-surface shadow-none ${className ?? ""}`}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="heading-3">Recent resumes</CardTitle>
                <Link href="/applications" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                    View All →
                </Link>
            </CardHeader>
            <CardContent>
                {RESUMES.map((r) => (
                    <div key={r.title} className="flex items-center justify-between border-t border-border py-3 first:border-t-0">
                        <div>
                            <p className="font-semibold text-foreground">{r.title}</p>
                            <p className="text-sm text-muted">{r.updated}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge className={`rounded-full border-0 font-mono text-[11px] ${r.type === "Tailored" ? "bg-accent-soft text-accent-text" : "bg-surface-raised text-muted"}`}>
                                {r.type}
                            </Badge>
                            <span className="number-sm text-foreground">{r.score}</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}