import { atsInstructions, role } from "@/lib/constants/ats.score";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const aiApi = async ( prompt: string, instruction?: string,) => {

    const response = await generateText({
        model: google("gemini-2.5-flash"),
        instructions: instruction || undefined,
        prompt
    })

    return response.text
}