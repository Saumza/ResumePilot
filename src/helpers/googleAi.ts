import { atsInstructions, role } from "@/lib/constants/ats.score";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const aiApi = async ( prompt: string, instruction?: string,) => {

    const response = await generateText({
        model: google("gemma-4-31b-it"),
        instructions: instruction || undefined,
        prompt,
    })

    return response.text
}