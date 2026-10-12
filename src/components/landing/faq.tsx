import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq() {
    const FAQS = [
        {
            v: "item-1",
            q: "Can I analyze my resume without a job description?",
            a: "Yes. The platform supports general resume analysis as well as job-specific evaluation."
        },
        {
            v: "item-2",
            q: "Can I tailor my resume to a specific tech role?",
            a: "Yes. You can provide a job description and use it to guide resume improvements relevant to the target role."
        },
        {
            v: "item-3",
            q: "Can I generate a cover letter for a job?",
            a: "Yes. Cover letters can be tailored using the role, job description, and available professional profile information."
        },
        {
            v: "item-4",
            q: "Can I apply directly through the platform?",
            a: "The platform helps you prepare your application and provides links to employer application pages. Application submission takes place through the employer's website."
        },
    ];

    return (
        <section id="faq" className="scroll-mt-24 border-t border-border px-6 py-15">
            <div className="mx-auto max-w-3xl">
                <h2 className="display-lg text-foreground">Frequently asked</h2>

                <Accordion
                    type="multiple"
                    defaultValue={["item-1"]}
                    className="mt-9 gap-3 px-0"
                >
                    {FAQS.map((item) => (
                        <AccordionItem key={item.v} value={item.v}>
                            <AccordionTrigger className="text-[17px] text-foreground hover:text-accent">{item.q}</AccordionTrigger>
                            <AccordionContent>{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}