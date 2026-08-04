import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";


export const GET = (asyncHandler(async (req: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || session.user) {
        throw new ApiError(401, "User Not Available. Please Login First")
    }

    const user: User = session.user as User

    const skillData = await prisma.skill.findMany({
        where: {
            userId: user.id
        }
    })

    return NextResponse.json(new ApiResponse(200, skillData, "Skill Fetched Successfully"))
}))