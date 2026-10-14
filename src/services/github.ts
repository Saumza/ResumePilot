import axios from "axios";

class github {
    async info<T>(gitUsername: string) {
        try {
            return await axios.post<T>(`api/github-info`, { gitUsername })
        } catch (error) {
            throw error
        }
    }

    async delete<T>() {
        try {
            return await axios.delete<T>(`api/github-info`)
        } catch (error) {
            throw error
        }
    }

    async getData<T>() {
        try {
            return await axios.get<T>(`api/github-info`)
        } catch (error) {
            throw error
        }
    }
}

const githubService = new github()
export { githubService }