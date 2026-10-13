'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaGithub } from "react-icons/fa"
import { useState } from "react"
import { GoogleIcon } from "@/components/googleIcon/googleIcon"

export default function SignInPage() {

    const [error, setError] = useState(false)

    const signInHandler = async (provider: "google" | "github") => {
        try {
            await signIn(provider, { callbackUrl: "/home" })
        } catch (error: any) {
            setError(error)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(620px 420px at 50% 8%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%), radial-gradient(520px 380px at 82% 94%, color-mix(in srgb, var(--accent-text) 14%, transparent), transparent 72%)",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000, transparent 75%)",
                    }}
                />
            </div>
            <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-surface/55 p-10 backdrop-blur-xl backdrop-saturate-125">
                <Link href="/" className="mb-14 inline-flex items-center gap-2.5">
                    <span className="h-3.5 w-3.5 rounded-sm bg-accent" aria-hidden />
                    <span className="heading-3 text-foreground">Resume Auto</span>
                </Link>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Continue to ResumeAuto
                </h1>
                <p className="mt-3 text-muted">Sign in, or create your account.</p>

                {error && (
                    <p role="alert" className="mt-6 text-sm text-danger">
                        Sign in failed, please try again
                    </p>
                )}

                <div className="mt-8 flex flex-col gap-3">
                    <Button
                        variant="outline"
                        onClick={() => signInHandler("google")}
                        className="h-12 w-full justify-center gap-3 rounded-lg border-border-strong bg-transparent text-foreground hover:bg-surface-raised hover:text-foreground"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => signInHandler("github")}
                        className="h-12 w-full justify-center gap-3 rounded-lg border-border-strong bg-transparent text-foreground hover:bg-surface-raised hover:text-foreground"
                    >
                        <FaGithub className="size-4.5" />
                        Continue with GitHub
                    </Button>
                </div>

                <p className="mt-10 text-xs text-muted">
                    By continuing you agree to the Terms and Privacy Policy.
                </p>
            </div>
        </main>
    )

}