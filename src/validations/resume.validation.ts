import { z } from "zod";

const maxSize = 5 * 1024 * 1024

export const pdfValidation = z.any()
    .refine((file) => file.type === "application/pdf", "Only PDF files are allowed")
    .refine((file) => file.size <= maxSize, "File size must be less than 5MB")


export const resumeIdCheck = z.object({
    resumeId: z.string().min(1, { message: "Resume Id Not Found" })
}) 