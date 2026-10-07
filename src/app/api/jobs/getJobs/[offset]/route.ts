import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../../auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";

export const GET = asyncHandler(async (request: NextRequest, { params }: { params: Promise<{ offset: number }> }) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First")
    }

    const { offset } = await params

    if (!offset || typeof offset === "string") {
        throw new ApiError(400, "Offset is request and should be of string type")
    }

    const listJobs = await prisma.job.findMany({
        skip: Number(offset),
        take: 15,
        orderBy: {
            createdAt: "desc"
        }
    })

    if (listJobs.length === 0) {
        return NextResponse.json(new ApiResponse(
            201,
            "No Jobs Available",
            "Fetch Successfull."
        ))
    }

    return NextResponse.json(new ApiResponse(
        201,
        listJobs,
        "Fetch Successfull."
    ), { status: 201 })

})