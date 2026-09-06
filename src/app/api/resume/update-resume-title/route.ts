import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";


export const PUT = asyncHandler(async (req: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Not Available")
    }

    const user: User = session.user as User

    const { resumeId, resumeName, type } = await req.json()

    if (!resumeId || !resumeName) {
        throw new ApiError(400, "ResumeId and ResumeName both are required")
    }


    if (type === "normal") {
        const updatedResume = await prisma.normalResume.update({
            where: {
                id: resumeId,
                ownerId: user.id
            },
            data: {
                name: resumeName
            }
        })

        if (!updatedResume) {
            throw new ApiError(404, "Resume Not Found")
        }

        return NextResponse.json(
            new ApiResponse(200, updatedResume, "Resume Name Updated Successfully")
        )
    }

    else if (type === "tailored") {
        const tailoredResume = await prisma.aiTailoredResume.update({
            where: {
                id: resumeId,
                ownerId: user.id
            },
            data: {
                name: resumeName
            }
        })

        if (!tailoredResume) {
            throw new ApiError(404, "Resume Not Found")
        }

        return NextResponse.json(
            new ApiResponse(200, tailoredResume, "Resume Name Updated Successfully")
        )
    }

    else {
        throw new ApiError(404, "Resume Type can either be Normal or Tailored")
    }

})