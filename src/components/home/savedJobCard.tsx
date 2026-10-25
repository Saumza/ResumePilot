import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export function SavedJobsCard() {
    const JOBS = [
        { role: "ML Engineer", company: "Anthropic", posted: "2d ago" },
        { role: "Data Scientist", company: "Stripe", posted: "4d ago" },
        { role: "AI Engineer", company: "Notion", posted: "5d ago" },
        { role: "Backend Engineer", company: "Linear", posted: "1w ago" },
    ].slice(0, 4); // max 4
    return (
        <Card className={`border-border bg-surface shadow-none`}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="heading-3">Saved jobs</CardTitle>
                <Link href="/applications" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                    View All →
                </Link>
            </CardHeader>
            <CardContent>
                {JOBS.map((j) => (
                    <div key={j.role} className="flex items-center justify-between border-t border-border py-3 first:border-t-0">
                        <div>
                            <p className="font-semibold text-foreground">{j.role}</p>
                            <p className="text-sm text-muted">{j.company}</p>
                        </div>
                        <span className="number-sm text-muted">{j.posted}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}