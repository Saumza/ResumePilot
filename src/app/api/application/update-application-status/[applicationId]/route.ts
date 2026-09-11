import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../../auth/[...nextauth]/option";
import { ApiError } from "@/utils/ApiError";
import { statusValidation } from "@/validations/application.validation";
import { z } from "zod"
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/ApiResponse";

export const PATCH = asyncHandler(async (request: NextRequest, { params }: { params: Promise<{ applicationId: string }> }) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First.")
    }

    const user: User = session.user as User

    const { applicationId } = await params
    const { status } = await request.json()

    const verifyStatus = {
        statusType: status
    }

    const result = statusValidation.safeParse(verifyStatus)

    if (result.error) {
        const codeError = z.treeifyError(result.error)
        throw new ApiError(400, codeError.properties?.statusType?.errors)
    }

    const { statusType } = result.data

    const updateStatus = await prisma.application.update({
        where: {
            id: applicationId
        },
        data: {
            status: statusType
        }
    })

    return NextResponse.json(
        new ApiResponse(201, updateStatus, "Status Updated Successfully")
    )
})