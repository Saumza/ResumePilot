import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../../auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";

export const PUT = asyncHandler(async (request: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First")
    }

    const user: User = session.user as User

    const { resumeId } = await params
    const { resumeData, type } = await request.json()

    if (Object.keys(resumeData).length === 0) {
        throw new ApiError(400, "Resume Data and ResumeId  both are required")
    }

    if (type === "normal") {

        const resumeUpdate = await prisma.normalResume.update({
            where: {
                id: resumeId,
                ownerId: user.id
            },
            data: {
                resumeText: resumeData
            }
        })

        return NextResponse.json(
            new ApiResponse(200, resumeUpdate, "Resume Updated Successfully")
        )

    }

    else if (type === "tailored") {

        const resumeUpdate = await prisma.aiTailoredResume.update({
            where: {
                id: resumeId,
                ownerId: user.id
            },
            data: {
                resumeData
            }
        })

        return NextResponse.json(
            new ApiResponse(200, resumeUpdate, "Resume Updated Successfully")
        )
    }

    else {
        throw new ApiError(404, "Resume Type can either be Normal or Tailored")
    }

})