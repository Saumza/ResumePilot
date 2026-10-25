import { FinalCta } from "@/components/landing/cta";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/feature";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { ResumeShowcase } from "@/components/landing/resumeShowcase";
import { ScrollBackground } from "@/components/landing/scrollBackground";

export default function Page() {
    return (
        <div className="landing min-h-screen bg-background text-foreground">
            <ScrollBackground />
            <div className="landing-content">
                <Navbar />
                <main>
                    <Hero />
                    <ResumeShowcase />
                    <Features />
                    <FinalCta />
                    <Faq />
                </main>
                <Footer />
            </div>
        </div>
    );
}