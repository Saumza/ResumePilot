import axios from "axios";

class skill {
    async addSkill<T>({ skillName, skillType }: { skillName: string, skillType: string }) {
        try {
            return await axios.post<T>("api/skills/add-skill", { skillName, skillType })
        } catch (error) {
            throw error
        }
    }

    async deleteSkill<T>(skillId: string) {
        try {
            return await axios.delete<T>(`api/skills/delete-skill/${skillId}`)
        } catch (error) {
            throw error
        }
    }

    async getSkills<T>() {
        try {
            return await axios.get<T>(`api/skills/get-skills`)
        } catch (error) {
            throw error
        }
    }
}

const skillService = new skill()
export { skillService }