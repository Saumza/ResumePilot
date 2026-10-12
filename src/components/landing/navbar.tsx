"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled
          ? "border-border bg-background/75 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-sm bg-accent" aria-hidden />
          <span className="heading-3 tracking-tight text-foreground">Resume Auto</span>
        </Link>
        <Button
          asChild
          variant="outline"
          className="h-9 border-accent bg-transparent text-accent-text hover:bg-accent-soft hover:text-accent-text"
        >
          <Link href="/signin">Sign in</Link>
        </Button>
      </div>
    </header>
  );
}