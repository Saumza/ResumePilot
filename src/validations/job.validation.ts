import { z } from "zod";

export const jobValidation = z.object({
    createdAt: z.string().min(1, { message: "CreatedAt is Required" }),
    offset: z.string().min(1, { message: "Offset is Required" })
}) 