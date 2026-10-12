import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { ResumeShowcase } from "./resume-showcase";

export function Hero() {

    const ROLES = ["ML Engineer", "Data Scientist", "AI Engineer", "Backend Engineer", "DevOps Engineer", "Full-Stack Engineer"];

    return (
        <section id="top" className="px-6 pt-26 pb-24">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-190 text-center">
                    <span className="caption inline-flex h-7.5 items-center rounded-full bg-accent-soft px-3.5 text-accent-text">
                        Resume intelligence for tech
                    </span>
                    <h1 className="display-xl mt-6 text-foreground">Tailor your resume for</h1>
                    <div className="display-xl text-accent-text">
                        <span
                            className="inline-block h-[1em] overflow-hidden align-bottom"
                            aria-label="different tech roles"
                        >
                            <span className="flex flex-col text-accent-text" style={{ animation: "cycle 15s infinite" }}>
                                {[...ROLES, ROLES[0]].map((r, i) => (
                                    <span key={i} className="h-[1em] leading-[1em]" aria-hidden={i === ROLES.length}>
                                        {r}
                                    </span>
                                ))}
                            </span>
                        </span>
                    </div>
                    <p className="body-lg mx-auto mt-5 max-w-120 text-muted">
                        Upload once, get an ATS score with section-wise fixes, and shape your resume to any job in minutes.
                    </p>
                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                        <Button asChild size="lg" className="bg-accent text-on-accent hover:brightness-110">
                            <Link href="/signin">Get started</Link>
                        </Button>
                        <Button asChild size="lg" variant="ghost" className="text-foreground hover:bg-transparent hover:text-accent-text">
                            <Link href="#features">See how it works</Link>
                        </Button>
                    </div>
                </div>

                {/* resume + overlaid ATS card, at the bottom of the hero */}
                <div className="mt-18">
                    {/* <ResumeShowcase /> */}
                </div>
            </div>
        </section >
    );
}