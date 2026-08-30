import { atsScorer } from "@/helpers/googleAi"
import { parsePdf } from "@/helpers/pdfParse"
import { prisma } from "@/lib/prisma"
import { ApiError } from "@/utils/ApiError"
import { ApiResponse } from "@/utils/ApiResponse"
import { asyncHandler } from "@/utils/asyncHandler"
import { pdfValidation, resumeIdCheck } from "@/validations/resume.validation"
import { getServerSession, User } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { authOption } from "../auth/[...nextauth]/option"


export const POST = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)
    if (!session || session.user) {
        throw new ApiError(401, "Session Unavailable. Login First")
    }

    const { resumeId, role, duration } = await request.json()

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
    // decide the flow whether one resume can be reviewed multiple times by creating changes in the resume data in the canvas inside the website application, if this is the flow then cancel this single review feature. And if not like there is no canvas for the resume data in the website and the changes will be done by the user outside the application and then added again for ATS Score then yes keep this feature.
    if (findResume.aiReviewed) {
        throw new ApiError(409, "Resume is Already Reviewed!")
    }

    const resumeInfo = JSON.parse(findResume.rawText)
    const response = await atsScorer(resumeInfo, role, duration)

    const parsedData = JSON.parse(response)
    const structuredData = {
        "sections": parsedData.sections,
        "topStrengths": parsedData.topStrengths,
        "topIssues": parsedData.topIssues,
        "scoringBreakdown": parsedData.scoringBreakdown
    }

    const reviewedResumeData = await prisma.normalResume.update({
        where: {
            id: checkedResumeId
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
})