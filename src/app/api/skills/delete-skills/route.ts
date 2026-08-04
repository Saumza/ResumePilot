import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { deleteSkillDataCheck } from "@/validations/skill.validation";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { z } from "zod";
import { prisma } from "@/lib/prisma";


export const DELETE = (asyncHandler(async (req: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || session.user) {
        throw new ApiError(401, "User Not Available. Please Login First")
    }

    const { skillId } = await req.json()

    const verifySkillId = {
        id: skillId
    }

    const result = deleteSkillDataCheck.safeParse(verifySkillId)

    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new ApiError(404, codeError.properties?.id?.errors)
    }

    const { id } = result.data

    await prisma.skill.delete({
        where: {
            id
        }
    })

    return NextResponse.json(new ApiResponse(200, { success: true }, "Skill Deleted Successfully"))
}))