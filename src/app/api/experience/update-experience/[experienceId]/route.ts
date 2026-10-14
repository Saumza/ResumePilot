import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { addExperienceValidation } from "@/validations/experience.validation";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { EmploymentType } from "../../../../../../generated/prisma/enums";
import { getServerSession, User } from "next-auth";
import { authOption } from "../../../auth/[...nextauth]/option";

export const PUT = asyncHandler(async (req: NextRequest, { params }: { params: Promise<{ experienceId: string }> }) => {

    const session = await getServerSession(authOption)

    if (!session || !session.user) {
        throw new ApiError(401, "User Not Available. Please Login First")
    }

    const { startDate, endDate, companyName, title, description, type } = await req.json()

    const { experienceId } = await params


    const checkExperienceData = {
        startYear: startDate,
        endYear: endDate,
        name: companyName,
        companyTitle: title,
        experienceDescription: description,
        employmentType: type
    }

    const result = addExperienceValidation.safeParse(checkExperienceData)

    if (!result.success) {
        const codeError = z.flattenError(result.error)
        throw new ApiError(400, codeError.fieldErrors)
    }

    const { startYear, endYear, name, companyTitle, experienceDescription, employmentType } = result.data

    const data = await prisma.experience.update({
        where: {
            id: experienceId
        },
        data: {
            startDate: startYear,
            endDate: endYear,
            companyName: name,
            title: companyTitle,
            description: experienceDescription,
            employmentType: employmentType
        }
    })

    return NextResponse.json(new ApiResponse(200, data, "Experience Updated Successfully"))
})