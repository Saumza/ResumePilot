const JOBS = [
  ["ML Engineer", "Anthropic · Remote", "2d ago"],
  ["Data Scientist", "Stripe · New York", "4d ago"],
  ["AI Engineer", "Notion · San Francisco", "5d ago"],
  ["Backend Engineer", "Linear · Remote", "1w ago"],
  ["DevOps Engineer", "Vercel · Remote", "1w ago"],
  ["Full-Stack Engineer", "Figma · London", "2w ago"],
];

const APPS: [string, string, keyof typeof STATUS][] = [
  ["Stripe", "Sr. Software Engineer", "applied"],
  ["Linear", "Backend Engineer", "interview"],
  ["Vercel", "DevOps Engineer", "saved"],
  ["Notion", "AI Engineer", "rejected"],
  ["Figma", "Full-Stack Engineer", "closed"],
];

const STATUS = {
  applied:   { label: "Applied",   cls: "bg-accent-soft text-accent-text",            dot: "bg-accent-text" },
  interview: { label: "Interview", cls: "bg-success/15 text-success",                 dot: "bg-success" },
  saved:     { label: "Saved",     cls: "bg-surface-raised text-muted",               dot: "bg-border-strong" },
  rejected:  { label: "Rejected",  cls: "bg-danger/15 text-danger",                   dot: "bg-danger" },
  closed:    { label: "Closed",    cls: "bg-muted/15 text-muted",                     dot: "bg-muted" },
};

export function AtsDemo() {
  return (
    <div className="reveal rounded-2xl border border-border bg-surface p-6">
      <div className="typewriter mono-label">What we found here</div>
      <div className="mt-6">
        <div className="mono-label text-success">Strengths</div>
        <h4 className="heading-3 mt-2.5 text-foreground">Strong, quantified impact</h4>
        <p className="body-sm mt-1.5 text-muted">Clear technical skills and bullets with measurable business outcomes.</p>
      </div>
      <div className="my-5.5 h-px bg-border" />
      <div>
        <div className="mono-label text-warning">Issues</div>
        <h4 className="heading-3 mt-2.5 text-foreground">Leadership is underplayed</h4>
        <p className="body-sm mt-1.5 text-muted">Emphasize technical leadership and add a production-grade project near the top.</p>
      </div>
    </div>
  );
}

export function TailoringDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="reveal rounded-2xl border border-border bg-surface p-6">
        <div className="mono-label">Before · your bullet</div>
        <p className="body mt-3 text-muted line-through">Built a payments service with retries and a queue.</p>
      </div>
      <div className="reveal rounded-2xl border bg-surface p-6" style={{ borderColor: "color-mix(in srgb, var(--accent) 40%, var(--border))" }}>
        <div className="mono-label text-accent-text">After · tailored for Stripe · Sr. SWE, Payments</div>
        <p className="body mt-3 text-foreground">
          Designed an <span className="text-accent-text">idempotent payment-rail</span> service with retry semantics and a
          Kafka-backed webhook queue, cutting <span className="text-accent-text">p99 latency</span> 62% across 4 regions.
        </p>
        <div className="my-4 h-px bg-border" />
        <div className="flex flex-wrap gap-2">
          {["idempotency", "webhook reliability", "p99 latency"].map((k) => (
            <span key={k} className="rounded-[5px] bg-accent-soft px-1.5 py-0.5 font-mono text-[13px] text-accent-text">{k}</span>
          ))}
        </div>
        <p className="caption mt-3 text-muted">3 job-description keywords matched · written in your voice</p>
      </div>
    </div>
  );
}

export function JobsDemo() {
  return (
    <div className="reveal rounded-2xl border border-border bg-surface px-6 py-2">
      {JOBS.map(([title, meta, when], i) => (
        <div key={i} className="flex items-center justify-between gap-4 border-t border-border py-4 first:border-t-0 transition-colors hover:bg-surface-raised">
          <div>
            <div className="body font-semibold text-foreground">{title}</div>
            <div className="body-sm text-muted">{meta}</div>
          </div>
          <span className="number-sm text-muted">{when}</span>
        </div>
      ))}
    </div>
  );
}

export function TrackerDemo() {
  return (
    <div className="reveal rounded-2xl border border-border bg-surface px-6 py-2">
      {APPS.map(([company, role, status], i) => {
        const s = STATUS[status];
        return (
          <div key={i} className="flex items-center justify-between gap-4 border-t border-border py-4 first:border-t-0">
            <div>
              <div className="body font-semibold text-foreground">{company}</div>
              <div className="body-sm text-muted">{role}</div>
            </div>
            <span className={`inline-flex h-6.5 items-center gap-1.5 rounded-full px-3 font-mono text-xs font-semibold ${s.cls}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />{s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}