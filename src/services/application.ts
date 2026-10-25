import axios from "axios";

class application {
    async uploadApplication<T>({ jobId, applicationStatus }: { jobId: string, applicationStatus: string }) {
        try {
            return await axios.post<T>("api/application/upload-application", { jobId, applicationStatus })
        } catch (error) {
            throw error
        }
    }


    async getApplications<T>() {
        try {
            return await axios.get<T>(`api/applications/get-applications`)
        } catch (error) {
            throw error
        }
    }

    async updateApplication<T>(applicationId: string, status: string) {
        try {
            return await axios.patch<T>(`api/applications/update-application-status/${applicationId}`, { status })
        } catch (error) {
            throw error

        }
    }
}

export const applicationService = new application()