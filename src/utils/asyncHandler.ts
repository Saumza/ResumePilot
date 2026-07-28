import { NextResponse } from "next/server"

type RouteHandler = (request: Request, context: any) => Promise<Response> | Response

export const asyncHandler = (requestHandler: RouteHandler) => async (request: Request, context: any) => {
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