import { z } from "zod";

export const addExperienceValidation = z.object({
    startYear: z.number().max(4, { message: "Start Year can't be more than 4 numbers" }),
    endYear: z.string({ message: "End Year can't be empty" }),
    name: z.string({ message: "Company Name can't be empty" }),
    companyTitle: z.string({ message: "Title can't be empty" }),
    experienceDescription: z.array(z.string()).min(1, { message: "Description should contain atleast one point" }),
    employmentType: z.string({ message: "Employment Type can't be empty" })
})