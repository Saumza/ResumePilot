'use client'

import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore } from "@/stores"


export default function StoreProvider({ children, }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()  // Create the store instance the first time this renders
    }
    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}