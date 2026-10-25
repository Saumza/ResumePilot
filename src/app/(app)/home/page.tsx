import { ApplicationsCard } from "@/components/home/applicationsCard";
import { AtsSummaryCard } from "@/components/home/atsSummaryCard";
import { RecentResumesCard } from "@/components/home/recentResumeCard";
import { SavedJobsCard } from "@/components/home/savedJobCard";

export default function HomePage() {
    return (
        <div>
            <h1 className="heading-1 text-foreground text-4xl font-semibold">What's Up, username</h1>
            <p className="mt-2 text-muted">Here's what your current updates look.</p>

            {/* creative bento: 12-col, cards span 7 / 5 and alternate */}
            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <ApplicationsCard />
                <AtsSummaryCard />
                <RecentResumesCard />
                <SavedJobsCard />
            </div>
        </div>
    );
}