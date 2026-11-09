import { application } from "@/types/ApplicationType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
    applications: application[],
    loadingState: "idle" | "loading" | "succeeded" | "failed";
    error: string | null
}

const initialState: state = {
    applications: [],
    loadingState: "idle",
    error: null
}


const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setLoadingState: (state, action) => { state.loadingState = action.payload },
        setErrorState: (state, action) => { state.error = action.payload },
        setApplications: (state, action) => {
            if (action.payload.length > 0) {
                state.applications = action.payload
            }
        },
        addOrUpdateApplication: (state, action) => {
            const index = state.applications.findIndex((application) => application.id === action.payload.id)
            if (index !== -1) {
                if (action.payload.name) {
                    state.applications[index].id = action.payload.name
                }
                else if (action.payload.resumeData) {
                    state.applications[index].id = action.payload.resumeData
                }
                if (action.payload.updatedAt) {
                    state.applications[index].updatedAt = action.payload.updatedAt
                }
            }
            else {
                state.applications.unshift(action.payload)
            }
        }
    }
})


export const { setLoadingState, setApplications, addOrUpdateApplication, setErrorState } = applicationSlice.actions
export const applicationReducer = applicationSlice.reducer