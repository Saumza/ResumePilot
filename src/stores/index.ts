import { configureStore } from "@reduxjs/toolkit";
import { resumeReducer } from "./slice/resumeSlice";
import { applicationReducer } from "./slice/applicationSlice";



export const makeStore = () => {
    return configureStore({
        reducer: {
            resume: resumeReducer,
            application: applicationReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']