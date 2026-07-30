import { parsePdf } from "@/helpers/pdfParse";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { pdfValidation } from "@/validations/resume.validation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { uploadOnCloudinary } from "@/utils/cloudinary";


export const POST = asyncHandler(async (request: Request) => {

    // TODO: 1. Get the userId and check if the token or session is valid or available
    
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    
    if (file?.size === 0) {
        throw new ApiError(404, "Pdf file is Required")
    }
    // TODO: 2. Check the type of the file if DOCX then another flow and if pdf the flow is already written
    
    const result = pdfValidation.safeParse(file)

    if (!result.success) {
        const error = z.treeifyError(result.error)
        throw new ApiError(404, error.errors[0])
    }

    const bytes = await result.data.arrayBuffer()
    const fileData = Buffer.from(bytes)

    const text = await parsePdf(fileData)

    if (!text || text.length === 0) {
        throw new ApiError(400, "PDF is either empty or appears to be scanned. Please upload text-based PDF")
    }

    const resumeInformation = text.split("\n")
    const stringResumeInfo = JSON.stringify(resumeInformation)

    const resumeUpload = await uploadOnCloudinary(fileData)

    // TODO: 3. add the userId just

    const resume = await prisma.normalResume.create({
        data: {
            ownerId: userId,
            rawText: stringResumeInfo,
            resumeUrl: resumeUpload.url
        }
    })

    return NextResponse.json(
        new ApiResponse(201, { resume }, "Resume Saved Successfully")
    )
})