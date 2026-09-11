import { z } from "zod"
import { Status } from "../../generated/prisma/enums"

export const uploadValidation = z.object({
    job_Id: z.string().min(1, { message: "Job Id is Required" }),
    applicationStatus: z.enum(Status)
})

export const statusValidation = z.object({
    statusType: z.enum(Status, { message: "Status can only be of the defined types." })
})