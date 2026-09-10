import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { ApiError } from "@/utils/ApiError";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/ApiResponse";


export const GET = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First.")
    }

    const user: User = session.user as User

    const allCoverLetters = await prisma.coverLetter.findMany({
        where: {
            ownerId: user.id
        }
    })

    if (allCoverLetters.length === 0) {
        return NextResponse.json(
            new ApiResponse(201, {}, "User doesn't have any Cover Letters")
        )
    }

    return NextResponse.json(
        new ApiResponse(201, allCoverLetters, "Cover Letters fetched Successfully")
    )
})