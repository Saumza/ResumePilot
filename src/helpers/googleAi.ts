import { atsInstructions, role } from "@/lib/constants/ats.score";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const aiApi = async (instruction: string, prompt: string) => {

    const response = await generateText({
        model: google("gemma-4-31b-it"),
        instructions: instruction,
        prompt
    })

    return response.text
}