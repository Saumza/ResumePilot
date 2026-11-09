'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { applicationService } from "@/services/application";
import { ApiResponse } from "@/utils/ApiResponse";
import { isAxiosError } from "axios";
import { Skeleton } from "@/components/ui/skeleton"
import { useAppDispatch } from "@/lib/hooks";
import { setApplications, setErrorState, setLoadingState } from "@/stores/slice/applicationSlice";

export function ApplicationsCard() {

    const [isFetching, setIsFetching] = useState(false)
    const [applicationList, setApplicationList] = useState([])
    const [error, setError] = useState("")
    const [emptyMessage, setEmptyMessage] = useState("")
    const dispatch = useAppDispatch()
    console.log("Application Component")

    useEffect(() => {
        setIsFetching(true)
        dispatch(setLoadingState("loading"))
        applicationService.getApplications<ApiResponse>().then((response) => {
            if (response.data.data.length === 0) {
                setEmptyMessage(response.data.message)
            }
            console.log(response.data)
            const list = response.data.data.slice(0, 5)
            setApplicationList(list)
            dispatch(setApplications(response.data.data))
        }).catch((error) => {
            if (isAxiosError(error)) {
                setError(error.response?.data.message)
                dispatch(() => {
                    setLoadingState("error")
                    setErrorState(error.response?.data.message)
                })
                console.log(error.message)
            }
            dispatch(setLoadingState("loading"))
        }).finally(() => { setIsFetching(false), dispatch(setLoadingState("success")) })
    }, [setApplicationList])

    if (error) {
        return (
            <Card className="border-border bg-surface shadow-none lg:col-span-6">
                <CardContent className="py-4 text-sm text-muted">{error}</CardContent>
            </Card>
        );
    }

    return (
        <Card className={`border-border bg-surface shadow-none lg:col-span-6`}>
            <CardHeader className="flex items-center justify-between space-y-0">
                <CardTitle className="heading-3">Applications</CardTitle>
                <Link href="/applications" className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
                    View All →
                </Link>
            </CardHeader>
            <CardContent>
                {
                    isFetching ?
                        <div className="flex flex-col gap-5">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-45" />
                                </div>
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-45" />
                                </div>
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                        :
                        <div>
                            {
                                emptyMessage ?
                                    <div className="h-60 flex items-center justify-center">
                                        <p className="font-semibold text-foreground text-xl">{emptyMessage}</p>
                                    </div>
                                    :
                                    applicationList.map((application: any) => (
                                        < div key={application.id} className="flex items-center justify-between border-t border-border py-3 first:border-t-0">
                                            <div>
                                                <p className="font-semibold text-foreground">{application.companyName}</p>
                                                <p className="text-sm text-muted">{application.jobRole}</p>
                                            </div>
                                            <Badge className={`rounded-full border-0 font-mono text-[11px] bg-accent-soft text-accent-text`}>{application.status}</Badge>
                                        </div>
                                    ))
                            }
                        </div>
                }
            </CardContent>
        </Card >
    );
}