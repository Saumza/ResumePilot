import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { ApiError } from "@/utils/ApiError";
import { uploadValidation } from "@/validations/application.validation";
import { z } from "zod"
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/ApiResponse";

export const POST = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First.")
    }

    const user: User = session.user as User

    const { jobId, status } = await request.json()

    const verifyUpload = {
        job_Id: jobId,
        applicationStatus: status
    }
    const result = uploadValidation.safeParse(verifyUpload)

    if (!result.success) {
        const codeError = z.flattenError(result.error)
        throw new ApiError(400, codeError.fieldErrors)
    }

    const { job_Id, applicationStatus } = result.data

    const findJob = await prisma.job.findFirst({
        where: {
            id: job_Id
        }
    })

    if (!findJob) {
        throw new ApiError(404, "Job Not Available")
    }


    const findResume = await prisma.aiTailoredResume.findFirst({
        where: {
            ownerId: user.id,
            jobId: job_Id
        }
    })

    const findCoverLetter = await prisma.coverLetter.findFirst({
        where: {
            ownerId: user.id,
            jobId: job_Id
        }
    })

    if (findResume || findCoverLetter) {
        const uploadApplication = await prisma.application.create({
            data: {
                userId: user.id,
                jobId: job_Id,
                companyName: findJob.companyName,
                jobRole: findJob.title,
                jobUrl: findJob.sourceUrl,
                status: applicationStatus,
                resumeId: findResume?.id,
                coverLetterId: findCoverLetter?.id
            }
        })

        return NextResponse.json(
            new ApiResponse(201, uploadApplication, "Application Uploaded Successfully")
        )
    }

    const uploadApplication = await prisma.application.create({
        data: {
            userId: user.id,
            jobId: job_Id,
            companyName: findJob.companyName,
            jobRole: findJob.title,
            jobUrl: findJob.sourceUrl,
            status: applicationStatus
        }
    })

    return NextResponse.json(
        new ApiResponse(201, uploadApplication, "Application Uploaded Successfully")
    )
})