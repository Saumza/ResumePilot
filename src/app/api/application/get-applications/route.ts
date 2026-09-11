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

    const allApplications = await prisma.application.findMany({
        where: {
            userId: user.id
        }
    })

    if (allApplications.length === 0) {
        return NextResponse.json(
            new ApiResponse(201, {}, "User doesn't have any applications.")
        )
    }

    return NextResponse.json(
        new ApiResponse(201, allApplications, "Applications Fetched Succcessfully")
    )
})