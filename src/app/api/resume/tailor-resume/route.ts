import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { ApiError } from "@/utils/ApiError";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { authOption } from "../../auth/[...nextauth]/option";
import { resumeTailor, resumeTailorwithDescription } from "@/validations/resumeTailoring.validation";
import { tailorInstructions, tailorPrompt } from "@/lib/constants/resume.tailor";
import { aiApi } from "@/helpers/googleAi";


export const POST = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Not Available")
    }

    const user: User = session.user as User

    const { resumeId, jobId, description } = await request.json()

    if (description) {

        const verifyValidation = {
            resumeId,
            jobDescription: description
        }

        const result = resumeTailorwithDescription.safeParse(verifyValidation)

        if (!result.success) {
            const codeError = z.flattenError(result.error)
            throw new ApiError(400, codeError.fieldErrors)
        }

        const resume_id = result.data.resumeId
        const { jobDescription } = result.data

        const findResume = await prisma.normalResume.findFirst({
            where: {
                id: resumeId
            }
        })

        if (!findResume) {
            throw new ApiError(404, "Resume Not Found")
        }

        const resumeInfo = JSON.parse(findResume.rawText)

        const instructions = tailorInstructions
        const prompt = tailorPrompt(resumeInfo, jobDescription)

        const response = await aiApi(instructions, prompt)

        const parsedResponse = JSON.parse(response)

        const tailoredResume = { ...parsedResponse.modifiedSections, ...findResume.rawText }
        const tailoredResumeUpload = await prisma.aiTailoredResume.create({
            data: {
                ownerId: user.id,
                jobDescription,
                originalResumeId: resume_id,
                resumeData: tailoredResume,
                aiInsights: parsedResponse.tailoringNotes
            }
        })

        return NextResponse.json(
            new ApiResponse(200, tailoredResumeUpload, "Resume Tailored Successfully")
        )
    }

    const verifyValidation = {
        resumeId,
        jobId
    }

    const result = resumeTailor.safeParse(verifyValidation)

    if (!result.success) {
        const codeError = z.flattenError(result.error)
        throw new ApiError(400, codeError.fieldErrors)
    }

    const resume_id = result.data.resumeId
    const job_id = result.data.resumeId

    const findResume = await prisma.normalResume.findFirst({
        where: {
            id: resume_id,
            ownerId: user.id
        }
    })

    if (!findResume) {
        throw new ApiError(404, "Resume Not Found")
    }

    const resumeInfo = JSON.parse(findResume.rawText)

    const findJob = await prisma.job.findFirst({
        where: {
            id: job_id
        }
    })

    if (!findJob) {
        throw new ApiError(404, "Job Listing Expired!")
    }

    const instruction = tailorInstructions
    const prompt = tailorPrompt(resumeInfo, findJob.description)

    const response = await aiApi(instruction, prompt)

    const parsedResponse = JSON.parse(response)


    const tailoredResume = { ...parsedResponse.modifiedSections, ...findResume.rawText }
    const tailoredResumeUpload = await prisma.aiTailoredResume.create({
        data: {
            ownerId: user.id,
            jobId: job_id,
            originalResumeId: resume_id,
            resumeData: tailoredResume,
            aiInsights: parsedResponse.tailoringNotes
        }
    })

    return NextResponse.json(
        new ApiResponse(200, tailoredResumeUpload, "Resume Tailored Successfully")
    )

})