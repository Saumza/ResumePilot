import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || session.user) {
        throw new ApiError(401, "User Not Available. Please Login First")
    }

    const user: User = session.user as User


    const experience = await prisma.experience.findMany({
        where: {
            userId: user.id
        }
    })

    if (experience.length === 0) {
        return NextResponse.json(new ApiResponse(200, {}, "No experience available"))
    }


    return NextResponse.json(new ApiResponse(200, experience, "Experiences Fetched Successfully"))
})