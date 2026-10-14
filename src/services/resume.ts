import axios from "axios";

class resume {
    async uploadResume<T>(formData: any) {
        try {
            return await axios.post<T>("/api/upload-resume", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        } catch (error) {
            throw error
        }
    }

    async atsScore<T>({ resumeId, role, duration, targetRole }: { resumeId: string, role: string, duration: string, targetRole?: string }) {
        try {
            return await axios.post<T>(`/api/resume/ats-score/${resumeId}`, { role, duration, targetRole })
        } catch (error) {
            throw error
        }
    }

    async tailorResume<T>({ resumeId, jobId, description }: { resumeId: string, jobId?: string, description: string }) {
        try {
            return await axios.post<T>(`/api/resume/tailor-resume/${resumeId}`, { jobId, description })
        } catch (error) {
            throw error
        }
    }

    async getAllResumes<T>() {
        try {
            return await axios.get<T>("api/resume/get-user-resumes")
        } catch (error) {
            throw error
        }
    }

    async getResume<T>({ resumeId }: { resumeId: string }) {
        try {
            return await axios.get<T>(`api/resume/get-resume/${resumeId}`)
        } catch (error) {
            throw error
        }
    }

    async deleteResume<T>({ resumeId }: { resumeId: string }) {
        try {
            return await axios.delete<T>(`api/resume/delete-resume/${resumeId}`)
        } catch (error) {
            throw error
        }
    }

    async updateResume<T>({ resumeId, resumeData, type }: { resumeId: string, resumeData: any, type: string }) {
        try {
            return await axios.put<T>(`api/resume/update-resume/${resumeId}`, { resumeData, type })
        } catch (error) {
            throw error
        }
    }

    async updateResumeTitle<T>({ resumeId, resumeName, type }: { resumeId: string, resumeName: any, type: string }) {
        try {
            return await axios.put<T>(`api/resume/update-resume/${resumeId}`, { resumeName, type })
        } catch (error) {
            throw error
        }
    }
}


const resumeService = new resume()
export { resumeService }