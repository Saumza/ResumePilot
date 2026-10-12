export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-6">
      <div className="mx-auto max-w-5xl py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-3.5 w-3.5 rounded-[4px] bg-accent" aria-hidden />
              <span className="heading-3 text-foreground">Resume Auto</span>
            </div>
            <p className="body-sm mt-3 max-w-xs text-muted">
              Score, tailor and track your resume for every tech role — in one place.
            </p>
          </div>
          <nav className="flex gap-12">
            <div className="flex flex-col gap-3">
              <a href="#top" className="body-sm text-muted hover:text-accent-text">Product</a>
              <a href="#features" className="body-sm text-muted hover:text-accent-text">How it works</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#jobs" className="body-sm text-muted hover:text-accent-text">Tech jobs</a>
              <a href="#faq" className="body-sm text-muted hover:text-accent-text">FAQ</a>
            </div>
          </nav>
        </div>
        <div className="my-5 h-px bg-border" />
        <p className="caption text-muted">© {year} Resume Auto</p>
      </div>
    </footer>
  );
}