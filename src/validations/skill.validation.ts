import { z } from "zod"


export const skillDataCheck = z.object({
    name: z.string().min(1, { message: "SkillName must contain atleast 1 character" }),
    type: z.string().min(1, { message: "SkillType must contain atleast 1 character" })
})


export const deleteSkillDataCheck = z.object({
    id: z.string().min(1, { message: "Id should be provided" })
})