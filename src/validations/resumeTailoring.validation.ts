import { z } from "zod"

export const resumeTailor = z.object({
    resumeId: z.string().min(1, { message: "ResumeId Not Available" }),
    jobId: z.string().min(1, { message: "JobId Not Available" })
})

export const resumeTailorwithDescription = z.object({
    resumeId: z.string().min(1, { message: "ResumeId Not Available" }),
    jobDescription: z.string().min(30, { message: "Please Provide Appropiate Description" })
})