import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
    return (
        <section className="border-t border-border px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="relative overflow-hidden rounded-[20px] border border-border bg-surface px-6 py-20 text-center">
                    {/* restrained accent detail instead of a big glow gradient */}
                    <span className="absolute left-1/2 top-0 h-0.75 w-40 -translate-x-1/2 rounded-full bg-accent" />
                    <h2 className="display-lg mx-auto max-w-2xl text-foreground">Make your next application count.</h2>
                    <p className="body-lg mx-auto mt-4.5 max-w-lg text-muted">
                        Start with your resume, match it to a role, and build an application that reflects your experience.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" className="animate-glow bg-accent text-on-accent hover:brightness-110">
                            <Link href="/signin">Get started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}