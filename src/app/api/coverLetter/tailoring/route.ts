import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { z } from "zod"
import { coverLetterTailor } from "@/validations/coverLetter.validation";
import { instructionsForDescriptions, role, tailorPrompt } from "@/lib/constants/coverLetter.tailor";
import { aiApi } from "@/helpers/googleAi";
import { aiTextToJson } from "@/helpers/pdfTextToJson";
import { prisma } from "@/lib/prisma";


export const POST = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First")
    }

    const user: User = session.user as User

    const { resumeId, companyName, position, tone, jobDescription, jobId } = await request.json()

    const verifyValidation = {
        resume_Id: resumeId,
        company_Name: companyName,
        job_Position: position,
        letter_Tone: tone
    }

    const result = coverLetterTailor.safeParse(verifyValidation)

    if (!result.success) {
        const codeError = z.flattenError(result.error)
        throw new ApiError(400, codeError.fieldErrors)
    }

    const { resume_Id, company_Name, job_Position, letter_Tone } = result.data

    const findResume = await prisma.aiTailoredResume.findFirst({
        where: {
            id: resume_Id
        }
    })

    if (!findResume) {
        throw new ApiError(404, "Resume Doesn't Exist")
    }

    const resumeInformation = JSON.stringify(findResume.resumeData)


    if (jobDescription) {

        const instructions = instructionsForDescriptions[letter_Tone as role]
        const prompt = tailorPrompt(resumeInformation, jobDescription, job_Position, company_Name)

        const response = await aiApi(prompt, instructions)
        const parsedResponse: Record<string, any> = aiTextToJson(response) || {}

        const uploadCoverLetter = await prisma.coverLetter.create({
            data: {
                ownerId: user.id,
                jobDescription,
                coverLetterData: parsedResponse.mainSection,
            }
        })

        return NextResponse.json(
            new ApiResponse(201, uploadCoverLetter, "CoverLetter Tailored Successfully")
        )
    }

    if (!jobId) {
        throw new ApiError(400, "JobId is Required")
    }


    const findJob = await prisma.job.findFirst({
        where: {
            id: jobId
        }
    })

    if (!findJob) {
        throw new ApiError(404, "Job Not Available in the Records")
    }

    const description = JSON.stringify(findJob.description)

    const instructions = instructionsForDescriptions[letter_Tone as role]
    const prompt = tailorPrompt(resumeInformation, description, job_Position, company_Name)

    const response = await aiApi(prompt, instructions)
    const parsedResponse: Record<string, any> = aiTextToJson(response) || {}

    const uploadCoverLetter = await prisma.coverLetter.create({
        data: {
            ownerId: user.id,
            jobDescription: description,
            coverLetterData: parsedResponse.mainSection,
            jobId
        }
    })

    return NextResponse.json(
        new ApiResponse(200, uploadCoverLetter, "CoverLetter Tailored Successfully")
    )
})