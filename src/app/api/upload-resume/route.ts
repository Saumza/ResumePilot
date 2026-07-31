import { parsePdf } from "@/helpers/pdfParse";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { pdfValidation } from "@/validations/resume.validation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { getServerSession, User } from "next-auth";
import { authOption } from "../auth/[...nextauth]/option";


export const POST = asyncHandler(async (request: Request) => {

    const session = await getServerSession(authOption)
    if (!session || session.user) {
        throw new ApiError(401, "Session Unavailable. Login First")
    }

    const user: User = session?.user as User

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
            ownerId: user.id,
            rawText: stringResumeInfo,
            resumeUrl: resumeUpload.url
        }
    })

    return NextResponse.json(
        new ApiResponse(201, { resume }, "Resume Saved Successfully")
    )
})