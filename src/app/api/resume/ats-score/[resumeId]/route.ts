import { aiApi } from "@/helpers/googleAi"
import { parsePdf } from "@/helpers/pdfParse"
import { prisma } from "@/lib/prisma"
import { ApiError } from "@/utils/ApiError"
import { ApiResponse } from "@/utils/ApiResponse"
import { asyncHandler } from "@/utils/asyncHandler"
import { pdfValidation, resumeIdCheck } from "@/validations/resume.validation"
import { getServerSession, User } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { authOption } from "../../../auth/[...nextauth]/option"
import { atsInstructions, atsPrompt, role } from "@/lib/constants/ats.score"
import { ipAddress } from "@/helpers/ipAddress"
import { aiFeatureRateLimiter } from "@/lib/rate-limiting/scoringAndTailoringRateLimiting"


export const PUT = asyncHandler(async (request: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) => {


    const session = await getServerSession(authOption)
    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Login First")
    }
    const user: User = session.user as User

    const ip = ipAddress(request)
    const data = await aiFeatureRateLimiter(ip)
    if (!data.allowed) {
        const error = {
            message: "Too many requests! Please try again later.",
            allowed: data.allowed,
            remaining: data.remaining,
            retryAfter: data.retryAfter
        }
        return NextResponse.json(
            error,
            {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': String(data.limit),
                    'X-RateLimit-Remaining': String(data.remaining),
                    'X-RateLimit-Reset': String(data.retryAfter)
                }
            }
        )
    }

    const { role, duration, targetRole } = await request.json()
    const { resumeId } = await params

    const verifyResumeId = {
        resumeId
    }

    const result = resumeIdCheck.safeParse(verifyResumeId)
    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new ApiError(404, codeError.properties?.resumeId?.errors[0] || "Id Not Found")
    }

    const checkedResumeId = result.data.resumeId

    const findResume = await prisma.normalResume.findFirst({
        where: { id: checkedResumeId }
    })

    if (!findResume) {
        throw new ApiError(404, "Resume Doesn't Exist")
    }


    const resumeInfo = JSON.stringify(findResume.resumeText)

    let instruction
    let prompt

    if (targetRole) {
        instruction = atsInstructions[role as role]
        prompt = atsPrompt(resumeInfo, duration, targetRole)

        const response = await aiApi(instruction, prompt)

        const parsedData = JSON.parse(response)
        const structuredData = {
            "sections": parsedData.sections,
            "topStrengths": parsedData.topStrengths,
            "topIssues": parsedData.topIssues,
            "scoringBreakdown": parsedData.scoringBreakdown
        }

        const reviewedResumeData = await prisma.normalResume.update({
            where: {
                id: checkedResumeId,
                ownerId: user.id
            },
            data: {
                atsScore: parsedData.overallScore,
                aiInsights: structuredData,
                aiReviewed: true
            }
        })

        if (!reviewedResumeData) {
            throw new ApiError(400, "Error while updating Resume Data")
        }

        return NextResponse.json(
            new ApiResponse(201, reviewedResumeData, "Resume Reviewed Successfully")
        )
    }

    instruction = atsInstructions[role as role]
    prompt = atsPrompt(resumeInfo, duration)

    const response = await aiApi(instruction, prompt)

    const parsedData = JSON.parse(response)

    if (parsedData.error) {
        throw new ApiError(400, parsedData.error)
    }

    const structuredData = {
        "sections": parsedData.sections,
        "topStrengths": parsedData.topStrengths,
        "topIssues": parsedData.topIssues,
        "scoringBreakdown": parsedData.scoringBreakdown
    }

    const reviewedResumeData = await prisma.normalResume.update({
        where: {
            id: checkedResumeId,
            ownerId: user.id
        },
        data: {
            atsScore: parsedData.overallScore,
            aiInsights: structuredData,
            aiReviewed: true
        }
    })

    if (!reviewedResumeData) {
        throw new ApiError(400, "Error while updating Resume Data")
    }

    return NextResponse.json(
        new ApiResponse(201, reviewedResumeData, "Resume Reviewed Successfully"),
        {
            status: 201,
            headers: {
                'X-RateLimit-Limit': String(data.limit),
                'X-RateLimit-Remaining': String(data.remaining),
                'X-RateLimit-Reset': String(data.retryAfter)
            }
        }
    )
})