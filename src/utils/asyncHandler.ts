import { NextRequest, NextResponse } from "next/server"

type RouteHandler = (request: NextRequest, context: any) => Promise<Response> | Response

export const asyncHandler = (requestHandler: RouteHandler) => async (request: NextRequest, context: any) => {
    try {
        return await requestHandler(request, context)
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Internal Server Error"
            },
            { status: error.status || 500 }
        )
    }
}