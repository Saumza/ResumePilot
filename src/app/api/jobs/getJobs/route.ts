import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/option";
import { prisma } from "@/lib/prisma";
import { jobValidation } from "@/validations/job.validation";
import { z } from "zod";

export const GET = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "Session Unavailable. Please Login First")
    }

    const searchParams = request.nextUrl.searchParams

    const created = searchParams.get("created")
    const skipData = searchParams.get("offset")

    const verifyJob = {
        createdAt: created,
        offset: skipData
    }

    const result = jobValidation.safeParse(verifyJob)

    if (!result.success) {
        const codeError = z.flattenError(result.error)
        throw new ApiError(400, codeError.fieldErrors)
    }

    const { createdAt, offset } = result.data

    const days_map: Record<string, number | null> = {
        "24h": 1,
        week: 7,
        "15d": 15,
        anytime: null,
    }

    const days = days_map[createdAt]

    if (days !== null && days !== undefined) {

        const cutoffDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000))

        const listJobs = await prisma.job.findMany({
            skip: Number(offset),
            take: 15,
            where: {
                createdAt: {
                    gte: cutoffDate
                }
            },
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