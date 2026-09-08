import { structurePrompt } from "@/lib/constants/resume.structure"
import { ApiError } from "@/utils/ApiError"
import { aiApi } from "./googleAi"


export const textToJson = async (text: string) => {
    try {

        const resumeInformation = text.split("\n")
        const stringResumeInfo = JSON.stringify(resumeInformation)

        const prompt = structurePrompt(stringResumeInfo)

        const response = await aiApi(prompt)

        const parsedResponse = JSON.parse(response)
        return parsedResponse

    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(500, error.message)
        }
    }
}