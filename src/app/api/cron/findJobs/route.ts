import { taskQueue } from "@/lib/queue";
import { findJobs } from "@/types/JobPayloadType";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request: NextRequest) => {

    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
        throw new ApiError(401, "Unauthorised")
    }

    const { triggeredBy } = await request.json()

    const payload: findJobs = {
        triggeredBy: triggeredBy || "cron",
        triggeredAt: Date.now()
    }

    const job = await taskQueue.add(
        "finding_job",
        {
            payload
        },
        {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 2000,
            },
            removeOnComplete: true
        }
    )

    return NextResponse.json(
        new ApiResponse(
            201,
            {
                status: true,
                jobId: job.id
            },
            "Task Added Successfully"
        ),
        { status: 201 }
    )

})