import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { normalResume, tailoredResume } from "@/types/ResumeTypes"

export const GET = asyncHandler(async (req: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "User Not Available. Please Login First")
    }

    const user: User = session.user as User

    let allResumes: { normalResume?: normalResume[], tailoredResume?: tailoredResume[] } = {}

    const normalResume = await prisma.normalResume.findMany({
        where: {
            ownerId: user.id
        }
    })

    if (normalResume.length !== 0) {
        allResumes.normalResume = normalResume
    }

    const aiTailoredResume = await prisma.aiTailoredResume.findMany({
        where: {
            ownerId: user.id
        }
    })

    if (aiTailoredResume.length !== 0) {
        allResumes.tailoredResume = aiTailoredResume
    }

    return NextResponse.json(new ApiResponse(200, allResumes, "Fetched Resume Successfully"))

})