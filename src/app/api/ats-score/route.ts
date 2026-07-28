import { atsScorer } from "@/helpers/googleAi"
import { parsePdf } from "@/helpers/pdfParse"
import { prisma } from "@/lib/prisma"
import { ApiError } from "@/utils/ApiError"
import { ApiResponse } from "@/utils/ApiResponse"
import { asyncHandler } from "@/utils/asyncHandler"
import { pdfValidation } from "@/validations/resume.validation"
import { NextResponse } from "next/server"
import { z } from "zod"


export const POST = asyncHandler(async (request: Request) => {

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (file?.size === 0) {
        throw new ApiError(404, "Pdf file is Required")
    }

    const result = pdfValidation.safeParse(file)

    if (!result.success) {
        const error = z.treeifyError(result.error)
        throw new ApiError(404, error.errors[0])
    }

    const bytes = await result.data.arrayBuffer()
    const pdfData = Buffer.from(bytes)

    const text = await parsePdf(pdfData)

    if (!text || text.length === 0) {
        throw new ApiError(400, "PDF is either empty or appears to be scanned. Please upload text-based PDF")
    }
    const resumeInformation = text.split("\n")

    const response = await atsScorer(resumeInformation)

    const parsedData = JSON.parse(response)

    // only two steps left one is to store the file in cloudinary and the other is to store data's in the DB and for that I need the user Data. 

    return NextResponse.json(
        new ApiResponse(201, parsedData, "Parsed Text Successfully")
    )
})