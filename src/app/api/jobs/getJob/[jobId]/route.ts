import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest, { params }: { params: Promise<{ jobId: number }> }) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First")
    }

    const { jobId } = await params

    if (!jobId || typeof jobId !== "string") {
        throw new ApiError(400, "JobId is Required and must be of string type")
    }

    const job = await prisma.job.findFirst({
        where: {
            id: jobId
        }
    })

    if (!job) {
        throw new ApiError(404, "Job Doesn't Exist Anymore")
    }

    return NextResponse.json(
        new ApiResponse(
            201,
            job,
            "Fetched Successfully"
        ),
        { status: 201 }
    )
})