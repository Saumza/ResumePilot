import { z } from "zod";

export const githubUsernameCheck = z.object({
    gitUsername: z.string().min(1, { message: "Github Username Not Found" })

}) 
export const githubIdCheck = z.object({
    githubId: z.string().min(1, { message: "Github Id Not Found" })
}) 