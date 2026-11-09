"use client"
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/lib/hooks";
import { File } from "lucide-react";


export function AtsSummaryCard() {

    const defaultData = {
        atsScore: 0,
        categories: [
            { area: "Skills-to-Experience", score: 0, max: 10 },
            { area: "Work Experience", score: 0, max: 10 },
            { area: "Content Quality", score: 0, max: 14 },
            { area: "ATS Compatibility", score: 0, max: 18 },
            { area: "Application Ready", score: 0, max: 8 }
        ]
    }
    const loadingState = useAppSelector((state) => state.resume.loadingState)
    const resumes = useAppSelector((state) => state.resume.resumes)
    const sorted = resumes.length !== 0 ? [...resumes].sort((a, b) => b.atsScore! - a.atsScore!)[0] : null
    const strongestResume = sorted ? {
        atsScore: sorted.atsScore,
        categories: [
            { area: "Skills-to-Experience", score: sorted.aiInsights.scoringBreakdown.skillsToExperience.scoreAwarded, max: sorted.aiInsights.scoringBreakdown.skillsToExperience.weight },
            { area: "Work Experience", score: sorted.aiInsights.scoringBreakdown.workExperience.scoreAwarded, max: sorted.aiInsights.scoringBreakdown.workExperience.weight },
            { area: "Content Quality", score: sorted.aiInsights.scoringBreakdown.contentQuality.scoreAwarded, max: sorted.aiInsights.scoringBreakdown.contentQuality.weight },
            { area: "ATS Compatibility", score: sorted.aiInsights.scoringBreakdown.atsCompatibility.scoreAwarded, max: sorted.aiInsights.scoringBreakdown.atsCompatibility.weight },
            { area: "Application Ready", score: sorted.aiInsights.scoringBreakdown.applicationReadiness.scoreAwarded, max: sorted.aiInsights.scoringBreakdown.applicationReadiness.weight }
        ]
    } : null
    console.log(strongestResume)


    if (loadingState === "idle" || loadingState === "loading") {
        return (
            <Card className={`border-border bg-surface shadow-none lg:col-span-6`}>
                <CardHeader className="flex items-center justify-between space-y-0">
                    <CardTitle className="heading-3">ATS score summary</CardTitle>
                    <Link href="/documents" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                        View All →
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <span className="number-sm text-[16px] font-bold text-muted">Your strongest resume scores</span>
                        <div>
                            <span className="number-sm text-[16px] text-accent-text">{defaultData.atsScore}</span>
                            <span className="number-sm text-[16px]">/100 </span>
                        </div>
                    </div>
                    <div className="mt-4 space-y-3">
                        {defaultData.categories.map((category, i) => (
                            <div key={category.area} className="grid grid-cols-[84px_1fr_56px] items-center gap-3">
                                <span className="text-sm text-muted">{category.area}</span>
                                <div className="h-2 overflow-hidden rounded-full bg-surface-raised">
                                    <div className="ats-fill h-full rounded-full bg-accent" style={{ width: `${(category.score / category.max) * 100}%`, animationDelay: `${i * 0.08}s` }} />
                                </div>
                                <span className="number-sm whitespace-nowrap text-right text-foreground">{category.score}/{category.max}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card >
        )
    }

    if (loadingState === "failed") {
        const error = useAppSelector((state) => state.resume.error)
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

    if (resumes.length === 0) {
        return (
            <Card className={`border-border bg-surface shadow-none lg:col-span-6`}>
                <CardHeader className="flex items-center justify-between space-y-0">
                    <CardTitle className="heading-3">ATS score summary</CardTitle>
                    <Link href="/documents" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                        View All →
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col my-2 items-center">
                        <File className="bg-background size-12 p-1 mb-2 rounded-2xl" />
                        <span className="text-xs text-muted font-mono">Empty Library</span>
                        <span className="text-[16px] font-mono">No Resumes Yet</span>
                    </div>
                </CardContent>
            </Card >
        );
    }

    if (Object.keys(sorted?.aiInsights).length === 0) {
        return (
            <Card className={`border-border bg-surface shadow-none lg:col-span-6`}>
                <CardHeader className="flex items-center justify-between space-y-0">
                    <CardTitle className="heading-3">ATS score summary</CardTitle>
                    <Link href="/documents" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                        View All →
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col my-2 items-center">
                        <span className="text-[16px] font-mono">No Resumes Reviewed Yet</span>
                    </div>
                </CardContent>
            </Card >
        )
    }
    return (
        <Card className={`border-border bg-surface shadow-none lg:col-span-6`}>
            <CardHeader className="flex items-center justify-between space-y-0">
                <CardTitle className="heading-3">ATS score summary</CardTitle>
                <Link href="/documents" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                    View All →
                </Link>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2">
                    <span className="number-sm text-[16px] font-bold text-muted">Your strongest resume scores</span>
                    <div>
                        <span className="number-sm text-[16px] text-accent-text">{strongestResume?.atsScore}</span>
                        <span className="number-sm text-[16px]">/100 </span>
                    </div>
                </div>
                <div className="mt-4 space-y-3">
                    {strongestResume?.categories.map((category, i) => (
                        <div key={category.area} className="grid grid-cols-[84px_1fr_56px] items-center gap-3">
                            <span className="text-sm text-muted">{category.area}</span>
                            <div className="h-2 overflow-hidden rounded-full bg-surface-raised">
                                <div className="ats-fill h-full rounded-full bg-accent" style={{ width: `${(category.score / category.max) * 100}%`, animationDelay: `${i * 0.08}s` }} />
                            </div>
                            <span className="number-sm whitespace-nowrap text-right text-foreground">{category.score}/{category.max}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

    )
}