import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { ApiError } from "@/utils/ApiError";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/ApiResponse";


export const PATCH = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First.")
    }

    const user: User = session.user as User

    const { coverLetterId, name } = await request.json()

    if (!coverLetterId || !name) {
        throw new ApiError(400, "Id and Name both are required.")
    }

    const updateCoverLetter = await prisma.coverLetter.update({
        where: {
            id: coverLetterId
        },
        data: {
            name
        }
    })

    return NextResponse.json(
        new ApiResponse(201, updateCoverLetter, "Cover Letter Name Updated Successfully")
    )

})