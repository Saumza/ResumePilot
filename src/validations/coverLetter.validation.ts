import { z } from "zod"

export const coverLetterTailor = z.object({
    resume_Id: z.string().min(1, { message: "ResumeId is Required." }),
    company_Name: z.string().min(1, { message: "Company Name is Required." }),
    job_Position: z.string().min(1, { message: "Job Position is Required." }),
    letter_Tone: z.string().min(1, { message: "Tone is Required." })
})