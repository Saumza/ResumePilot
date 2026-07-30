import { atsScorer } from "@/helpers/googleAi"
import { parsePdf } from "@/helpers/pdfParse"
import { prisma } from "@/lib/prisma"
import { ApiError } from "@/utils/ApiError"
import { ApiResponse } from "@/utils/ApiResponse"
import { asyncHandler } from "@/utils/asyncHandler"
import { pdfValidation, resumeIdCheck } from "@/validations/resume.validation"
import { NextResponse } from "next/server"
import { z } from "zod"


export const POST = asyncHandler(async (request: Request) => {

    const { resumeId } = await request.json()

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

    const resumeInfo = JSON.parse(findResume.rawText)

    const response = await atsScorer(resumeInfo)

    const parsedData = JSON.parse(response)

    const reviewedResumeData = await prisma.normalResume.update({
        where: {
            id: checkedResumeId
        },
        data: {
            atsScore: parsedData.overallScore,
            aiInsights: parsedData.sections,
            aiReviewed: true
        }
    })

    return NextResponse.json(
        new ApiResponse(201, reviewedResumeData, "Parsed Text Successfully")
    )
})