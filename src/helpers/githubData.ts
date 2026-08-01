import { ApiError } from "@/utils/ApiError"
import axios, { isAxiosError } from "axios"
import { describe } from "zod/v4/core"

export interface gitUserData {
    publicRepos: number
    totalStars: number
    totalLanguagesUsed: number
    topLanguages: string[]
    repos: any
}

export const githubData = async (username: string): Promise<any> => {
    const gitUserData: gitUserData = {
        publicRepos: 0,
        totalStars: 0,
        totalLanguagesUsed: 0,
        topLanguages: [],
        repos: []
    }
    try {
        const response = await axios.get(`${process.env.GITHUB_REPOS_URL}/${username}/repos?per_page=5`)

        const userData = response.data

        gitUserData.publicRepos = userData.length
        gitUserData.totalStars = userData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)

        const languages = [...new Set(userData.map((data: any) => data.language).filter(Boolean))]
        gitUserData.totalLanguagesUsed = languages.length

        gitUserData.topLanguages = languages as string[]

        const repos = []

        for (const data of userData) {
            const repoData = {
                name: data.name,
                url: data.html_url,
                starCount: data.stargazers_count,
                description: data.description,
                language: data.language

            }
            repos.push(repoData)
        }

        gitUserData.repos = repos

        return gitUserData

    } catch (error) {
        if (isAxiosError(error)) {
            throw new ApiError(404, error.response?.data.message)
        }
        throw new ApiError(404, "Data Not Found")
    }
}