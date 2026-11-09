'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { timeDiff } from "@/helpers/timeDiffConversion";


export function SavedJobsCard() {
    const JOBS = [
        { role: "ML Engineer", company: "Anthropic", posted: "2d ago" },
        { role: "Data Scientist", company: "Stripe", posted: "4d ago" },
        { role: "AI Engineer", company: "Notion", posted: "5d ago" },
        { role: "Backend Engineer", company: "Linear", posted: "1w ago" },
    ].slice(0, 4); // max 4

    const loadingState = useAppSelector((state) => state.application.loadingState)
    const allJobs = useAppSelector((state) => state.application.applications)
    const savedJobs = allJobs.length !== 0 ? allJobs.filter((job) => job.status === "Saved") : null
    const error = useAppSelector((state) => state.application.error)

    if (loadingState === "idle" || loadingState === "loading") {
        return (
            <div className="flex flex-col gap-5">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-45" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-45" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        )
    }

    if (loadingState === "failed") {
        return (
            <Card className={`border-border bg-surface shadow-none lg:col-span-6`}>
                <CardHeader className="flex items-center justify-between space-y-0">
                    <CardTitle className="heading-3">ATS score summary</CardTitle>
                    <Link href="/documents" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                        View All →
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="py-6 text-center" role="alert">
                        <p className="font-medium">Unable to load ATS summary</p>
                        <p className="mt-1 text-sm text-muted">
                            {error ?? "Something went wrong. Please try again."}
                        </p>
                    </div>
                </CardContent>
            </Card >
        )
    }

    if (savedJobs?.length === 0) {
        return (
            <Card className={`border-border bg-surface shadow-none lg:col-span-6`}>
                <CardHeader className="flex items-center justify-between space-y-0">
                    <CardTitle className="heading-3">ATS score summary</CardTitle>
                    <Link href="/documents" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                        View All →
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="h-60 flex items-center justify-center">
                        <p className="font-semibold text-foreground text-xl">User has no saved Jobs</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className={`border-border bg-surface shadow-none lg:col-span-5`}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="heading-3">Saved jobs</CardTitle>
                <Link href="/applications" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                    View All →
                </Link>
            </CardHeader>
            <CardContent>
                {savedJobs?.map((j) => (
                    <div key={j.id} className="flex items-center justify-between border-t border-border py-3 first:border-t-0">
                        <div>
                            <p className="font-semibold text-foreground">{j.jobRole}</p>
                            <p className="text-sm text-muted">{j.companyName}</p>
                        </div>
                        <span className="number-sm text-muted">{timeDiff(String(j.appliedAt))}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}