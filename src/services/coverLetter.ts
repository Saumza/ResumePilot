import axios from "axios";

class coverLetter {

    async tailor<T>(resumeId: string, companyName: string, position: string, tone: string, jobDescription?: string, jobId?: string) {
        try {
            return await axios.post<T>("api/coverLetter/tailoring", { resumeId, companyName, position, tone, jobDescription, jobId })
        } catch (error) {
            throw error
        }
    }

    async updateName<T>(coverLetterId: string, name: string) {
        try {
            return await axios.patch<T>(`api/coverLetter/tailoring/${coverLetterId}`, { name })
        } catch (error) {
            throw error
        }
    }

    async delete<T>(coverLetterId: string) {
        try {
            return await axios.patch<T>(`api/coverLetter/delete/${coverLetterId}`)
        } catch (error) {
            throw error
        }
    }

    async getAll<T>() {
        try {
            return await axios.get<T>(`api/coverLetter/getAll`)
        } catch (error) {
            throw error
        }
    }
}

export const coverLetterService = new coverLetter()