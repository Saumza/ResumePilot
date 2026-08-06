import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";


export const GET = asyncHandler(async (req: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || session.user) {
        throw new ApiError(401, "User Not Available. Please Login First")
    }

    const user: User = session.user as User

    const data = await prisma.normalResume.findMany({
        where: {
            ownerId: user.id
        }
    })

    if (data.length === 0) {
        return NextResponse.json(new ApiResponse(200, {}, "User doesn't have any Resume."))
    }

    return NextResponse.json(new ApiResponse(200, data, "Fetched Resume Successfully"))

})