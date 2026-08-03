import { githubData } from "@/helpers/githubData";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { githubIdCheck, githubUsernameCheck } from "@/validations/github.validation";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { gitUserData } from "@/helpers/githubData";
import { authOption } from "../auth/[...nextauth]/option";


export const POST = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)
    if (!session || session.user) {
        throw new ApiError(401, "Session Unavailable. Login First")
    }

    const user: User = session?.user as User

    const { gitUsername } = await request.json()

    const verifyGithubUsername = {
        gitUsername
    }

    const result = githubUsernameCheck.safeParse(verifyGithubUsername)
    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new ApiError(400, codeError.properties?.gitUsername?.errors[0]!)
    }

    const githubUsername: string = result.data.gitUsername

    const githubUserData: gitUserData = await githubData(githubUsername)

    const gitData = await prisma.github.create({
        data: {
            userId: user.id,
            username: githubUsername,
            url: `${process.env.GITHUB_URL}/${githubUsername}`,
            totalPublicRepos: githubUserData.publicRepos,
            totalStars: githubUserData.totalStars,
            totalLanguages: githubUserData.totalLanguagesUsed,
            languages: githubUserData.topLanguages,
            repositories: githubUserData.repos
        }
    })

    if (!gitData) {
        throw new ApiError(400, "Error while updating GitHub Data")
    }

    return NextResponse.json(new ApiResponse(200, gitData, "Data Fetched Successfully"))
})


export const DELETE = asyncHandler(async (request: NextRequest) => {

    const session = await getServerSession(authOption)

    if (!session || session.user) {
        throw new ApiError(401, "Session Unavailable. Login First")
    }

    const user: User = session?.user as User

    const { githubId } = await request.json()

    const verifyGithubId = {
        githubId
    }

    const result = githubIdCheck.safeParse(verifyGithubId)

    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new ApiError(400, codeError.properties?.githubId?.errors[0]!)
    }

    const gitUserData = result.data.githubId

    await prisma.github.delete({
        where: {
            id: gitUserData
        }
    })

    return NextResponse.json(new ApiResponse(200, true, "Record Deleted Successfully"))
})