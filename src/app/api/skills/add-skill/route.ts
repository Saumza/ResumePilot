import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { skillDataCheck } from "@/validations/skill.validation";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOption } from "../../auth/[...nextauth]/option";
import { SkillType } from "../../../../../generated/prisma/enums";


export const POST = asyncHandler(async (req: NextRequest) => {

    // const session = await getServerSession(authOption)

    // if (!session || session.user) {
    //     throw new ApiError(401, "User Not Available. Please Login First")
    // }

    // const user: User = session.user as User

    const { skillName, skillType, userId } = await req.json()

    const verifyData = {
        name: skillName,
        type: skillType
    }

    const result = skillDataCheck.safeParse(verifyData)

    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new ApiError(400, codeError.properties)
    }

    const { name, type } = result.data

    const skillData = await prisma.skill.create({
        data: {
            userId: userId,
            skillName: name,
            skillType: type as SkillType
        }
    })

    return NextResponse.json(new ApiResponse(200, skillData, "Skill Added SuccessfullyD"))
})