import Image from "next/image";

export function ResumeShowcase() {
    const BARS = [["Skills", 90], ["Experience", 78], ["Projects", 80]] as const;
    return (
        <div className="mb-25">
            <div className="mx-auto mb-25 max-w-155 text-center">
                <h2 className="display-lg text-[40px] leading-10 text-foreground ">
                    View every insight about your resume
                </h2>
                <p className="body-lg text-[18px] mt-5 text-muted">
                    Every resume runs through a screening test that calls out its strengths and weaknesses,
                    flag the bullet to fix, and rewrite them to pass the screen
                </p>
            </div>

            <div className="relative mx-auto max-w-3xl">
                <Image
                    src="/dummy-resume-image.png"
                    alt="resume-image"
                    width={800}
                    height={800}
                />
                {/* opaque ATS card over the top-right */}
                <div className="ats-entrance absolute -right-25 -top-10 w-64 rounded-xl bg-surface-raised/80 p-5 shadow-[0_22px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl backdrop-saturate-150 max-md:static max-md:mt-5 max-md:w-auto">
                    <div className="mono-label">ATS score</div>
                    <div className="mt-3 flex items-center gap-4">
                        <div className="relative h-22 w-22 shrink-0">
                            <div className="ring-anim h-full w-full rounded-full" />
                            <div className="absolute inset-2.25 flex items-center justify-center rounded-full bg-surface">
                                <span className="number-md">82</span>
                            </div>
                        </div>
                        <div>
                            <p className="number-md text-success">Good</p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2.5">
                        {BARS.map(([label, v], i) => (
                            <div key={label}>
                                <div className="mb-1 flex justify-between">
                                    <span className="number-sm text-muted">{label}</span>
                                    <span className="number-sm">{v}</span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised">
                                    <div className="bar-fill h-full rounded-full bg-accent"
                                        style={{ ["--w" as string]: `${v}%`, animationDelay: `${i * 0.14}s` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}