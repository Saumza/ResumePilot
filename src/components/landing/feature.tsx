import { AtsDemo, TailoringDemo, JobsDemo, TrackerDemo } from "./featureDemos";

const FEATURES = [
    {
        id: "ats", step: "01 / ATS scoring", title: "See exactly what a tracker sees",
        body: "A section-wise read on your resume — what already lands, and what to fix before you send it.", demo: <AtsDemo />
    },
    {
        id: "tailor", step: "02 / AI resume tailoring", title: "Rewritten for the role, in your voice",
        body: "Paste a job description and watch each bullet reshape itself around the keywords that matter.", demo: <TailoringDemo />
    },
    {
        id: "jobs", step: "03 / Job discovery", title: "Roles that fit your profile",
        body: "Fresh tech openings matched to your skills and experience, newest first.", demo: <JobsDemo />
    },
    {
        id: "tracker", step: "04 / Application tracker", title: "Every application, one view",
        body: "Track each role from saved to closed without a spreadsheet.", demo: <TrackerDemo />
    },
];

export function Features() {
    return (
        <section id="features" className="scroll-mt-24 border-t border-border px-6 py-15">
            <div className="mx-auto max-w-5xl ">
                <div className="max-w-xl mb-10">
                    <h2 className="display-lg text-foreground">Everything the job hunt needs</h2>
                    <p className="body-lg mt-4 text-muted">Score, tailor, discover and track — in one flow.</p>
                </div>

                {FEATURES.map((f) => (
                    <div
                        key={f.id}
                        id={f.id === "jobs" ? "jobs" : undefined}
                        className="grid scroll-mt-24 items-start gap-14 border-t border-border py-18 md:grid-cols-[0.92fr_1.08fr]"
                    >
                        <div className="md:sticky md:top-24">
                            <div className="font-mono text-sm font-semibold text-accent-text">{f.step}</div>
                            <h3 className="display-lg mt-3.5 text-[30px] leading-9 text-foreground">{f.title}</h3>
                            <p className="body mt-3.5 max-w-sm text-muted">{f.body}</p>
                        </div>
                        <div>{f.demo}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}