import axios from "axios";

class experience {

    async add<T>({ startDate, endDate, companyName, title, description, type }: { startDate: number, endDate: string, companyName: string, title: string, description: string[], type: string }) {
        try {
            return await axios.post<T>("api/experience/add-experience", { startDate, endDate, companyName, title, description, type })
        } catch (error) {
            throw error
        }
    }

    async update<T>({ startDate, endDate, companyName, title, description, type, experienceId }: { startDate: number, endDate: string, companyName: string, title: string, description: string[], type: string, experienceId: string }) {
        try {
            return await axios.put<T>(`api/experience/update-experience/${experienceId}`, { startDate, endDate, companyName, title, description, type })
        } catch (error) {
            throw error
        }
    }

    async delete<T>(experienceId: string) {
        try {
            return await axios.delete<T>(`api/experience/delete-experience/${experienceId}`)
        } catch (error) {
            throw error
        }
    }

    async get<T>() {
        try {
            return await axios.get<T>(`api/experience/get-experiences`)
        } catch (error) {
            throw error
        }
    }
}

export const experienceService = new experience()