import axios, { isAxiosError } from "axios"
import { prisma } from "../prisma"
import { JobType } from "../../../generated/prisma/enums"
import { RetryableError } from "@/utils/RetryableError"
import { PermanentError } from "@/utils/PermanentError"
import { Job } from "bullmq"

interface jobs {
    externalJobId: string,
    companyName: string,
    title: string,
    description: string,
    location: string,
    sourceUrl: string,
    jobType?: JobType,
    createdAt: Date
}

interface apiJobType {
    salary_is_predicted: string,
    description: string,
    longitude: number,
    contract_time: string,
    created: Date,
    location: any,
    company: any,
    category: any,
    __CLASS__: string
    latitude: number,
    redirect_url: string,
    id: string,
    adref: string,
    title: string
}

export const jobFind = async (job: Job) => {
    const allJobs: jobs[] = []

    const countries = ["gb", "us", "in", "ca", "de"]
    const categories = ["it-jobs", "engineering-jobs", "graduate-jobs"]
    const maxPage = 1

    const jobMatrix = countries.flatMap((country) => categories.map((category) => ({ country, category })))

    const transientErrorCode = [429, 500, 502, 503, 504]
    const permanentErrorCode = [400, 401, 403, 404, 422]

    try {
        for (const { country, category } of jobMatrix) {
            const jobs: jobs[] = []
            for (let i = 1; i <= maxPage; i++) {
                const url = `${process.env.ADZUNABASEURL}/${country}/search/${i}?app_id=${process.env.ADZUNAAPPID}&app_key=${process.env.ADZUNAAPPKEY}&category=${category}&results_per_page=50&what_or=software+developer+programmer+ai+devops&sort_by=date&max_days_old=7`

                const response = await axios.get(url)
                const jobData = response.data as apiJobType[]

                jobs.push(...jobData.map((job) => ({
                    externalJobId: job.id,
                    companyName: job.company,
                    title: job.title,
                    description: job.description,
                    location: job.location.display_name,
                    sourceUrl: job.redirect_url,
                    createdAt: job.created
                })))
            }
            allJobs.push(...jobs)
        }

        await prisma.job.createMany({
            data: allJobs,
            skipDuplicates: true   //for idempotency if worker fails or crashes then the repeated data won't be saved in db
        })

        console.log(`Successfully fetched ${allJobs.length} jobs from Adzuna Api.`)
        return { success: true }

    } catch (error: any) {
        if (isAxiosError(error)) {
            if (transientErrorCode.includes(error.response?.status!)) {
                console.error(`Error for jobId: ${job.id} for Adzuna Api.`, error.code)
                throw new RetryableError(error.code!)
            }
            if (permanentErrorCode.includes(error.response?.status!)) {
                console.error(`Error for jobId: ${job.id} for Adzuna Api.`, error.code)
                throw new PermanentError(error.code!)
            }
        }
        console.error(`Error for jobId: ${job.id} for Adzuna Api.`, error.message)
        throw new RetryableError(error)
    }
}