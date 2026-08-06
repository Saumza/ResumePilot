import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { resumeIdCheck } from "@/validations/resume.validation";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = asyncHandler(async (req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) => {

    const { resumeId } = await params

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "User Not Available. Please Login First")
    }

    const user: User = session.user as User

    const verifyResumeId = {
        resumeId
    }

    const result = resumeIdCheck.safeParse(verifyResumeId)

    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new ApiError(404, codeError.properties?.resumeId?.errors)
    }

    const data = await prisma.normalResume.findFirst({
        where: {
            ownerId: user.id,
            id: resumeId
        }
    })

    if (!data) {
        throw new ApiError(401, "Resume Not Found")
    }

    return NextResponse.json(new ApiResponse(200, data, "Resume Fetched Successfully"))
})