import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const DELETE = asyncHandler(async (request: NextRequest, { params }: { params: Promise<{ coverLetterId: string }> }) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First!")
    }

    const user: User = session.user as User

    const { coverLetterId } = await params

    if (!coverLetterId) {
        throw new ApiError(400, "Cover Letter Id is Required.")
    }

    await prisma.coverLetter.delete({
        where: {
            id: coverLetterId,
            ownerId: user.id
        }
    })

    return NextResponse.json(
        new ApiResponse(200, { success: true }, "Cover Letter Deleted Successfully")
    )
})