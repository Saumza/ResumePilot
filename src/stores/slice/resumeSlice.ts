import { normalResume, tailoredResume } from "@/types/ResumeTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
    resumes: (normalResume | tailoredResume)[],
    loadingState: "idle" | "loading" | "succeeded" | "failed";
    error: string | null
}

const initialState: state = {
    resumes: [],
    loadingState: "idle",
    error: null
}


const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        setLoadingState: (state, action) => { state.loadingState = action.payload },
        setErrorState: (state, action) => { state.error = action.payload },
        setResumes: (state, action) => {
            if (action.payload.length > 0) {
                state.resumes = action.payload
            }
        },
        addOrUpdateResume: (state, action: PayloadAction<normalResume & tailoredResume>) => {
            const index = state.resumes.findIndex((resume) => resume.id === action.payload.id)
            if (index !== -1) {
                if (action.payload.name) {
                    state.resumes[index].name = action.payload.name
                }
                else if (action.payload.resumeData) {
                    state.resumes[index].resumeData = action.payload.resumeData
                }
                if (action.payload.updatedAt) {
                    state.resumes[index].updatedAt = action.payload.updatedAt
                }
            }
            else {
                state.resumes.unshift(action.payload)
            }
        }
    }
})


export const { setLoadingState, setResumes, addOrUpdateResume,setErrorState } = resumeSlice.actions
export const resumeReducer = resumeSlice.reducer