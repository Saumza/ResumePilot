import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { deleteFromCloudinary } from "@/utils/cloudinary";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const DELETE = asyncHandler(async (req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) => {

    const { resumeId } = await params
    
    const session = await getServerSession(authOption)
    if (!session || !session.user) {
        throw new ApiError(401, "User Not Available. Please Login First")
    }

    const user: User = session.user as User


    const resume = await prisma.normalResume.delete({
        where: {
            id: resumeId,
            ownerId: user.id
        }
    })

    await deleteFromCloudinary(resume.publicId)

    return NextResponse.json(new ApiResponse(200, { success: true }, "Resume Deleted Sucessfully"))

}) 