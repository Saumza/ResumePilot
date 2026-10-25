"use client"
import Link from "next/link";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";


export function AtsSummaryCard() {

    const data = [
        { area: "Skills", score: 90 },
        { area: "Experience", score: 78 },
        { area: "Projects", score: 80 },
        { area: "Education", score: 72 },
        { area: "Keywords", score: 85 },
    ];

    const config = { score: { label: "Score", color: "var(--accent)" } } satisfies ChartConfig;

    return (
        <Card className={`border-border bg-surface shadow-none lg:col-span-5`}>
            <CardHeader className="flex items-center justify-between space-y-0">
                <CardTitle className="heading-3">ATS score summary</CardTitle>
                <Link href="/documents" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                    View All →
                </Link>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2.5">
                    <span className="number-xl text-success">82</span>
                    <span className="number-sm text-muted">/ 100 </span>
                    <span className="number-sm text-muted"> Good</span>
                </div>
                <ChartContainer config={config} className="mt-4 h-50 w-full">
                    <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis
                            type="category"
                            dataKey="area"
                            tickLine={false}
                            axisLine={false}
                            width={80}
                            tick={{ fill: "var(--text-muted)", fontSize: 13 }}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="var(--color-score)" radius={6} barSize={14} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}