import { ApplicationsCard } from "@/components/home/applicationsCard";
import { AtsSummaryCard } from "@/components/home/atsSummaryCard";
import { RecentResumesCard } from "@/components/home/recentResumeCard";
import { SavedJobsCard } from "@/components/home/savedJobCard";
import { HomeHeader } from "@/components/home/homeHeader"

export default function HomePage() {
    return (
        <div>
            <HomeHeader />
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