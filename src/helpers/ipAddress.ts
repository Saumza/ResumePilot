import { NextRequest } from "next/server";

export const ipAddress = (request: NextRequest) => {
    // header provides an array of ip addresses(client ip, proxy ip) when deployed, the first ip is clients ip or client ip is provided in the real-ip header when deployed
    const forwarded = request.headers.get("x-forwarded-for")

    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "127.0.0.1"

    return ip
}