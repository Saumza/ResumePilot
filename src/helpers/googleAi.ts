import { atsInstructions, role } from "@/lib/constants/ats.score";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const atsScorer = async (resumeInformation: string[], role: string, duration: string) => {

    const instruction = atsInstructions[role as role]

    const response = await generateText({
        model: google("gemma-4-31b-it"),
        instructions: instruction,
        prompt: `Evaluate the following resume for the target role: ${role}.
                The candidate has ${duration} years of experience.
                Adjust evaluation expectations accordingly for this experience level.
                This is the user's Resume's Information ${resumeInformation}.`
    })

    return response.text
}