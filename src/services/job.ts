import axios from "axios";

class job {
    async getJobs<T>(offset: number, createdAt: any,) {
        try {
            return await axios.get<T>(`api/jobs/getJobs`, { params: { offset, createdAt } })
        } catch (error) {
            throw error
        }
    }
}

const jobService = new job()
export { jobService }