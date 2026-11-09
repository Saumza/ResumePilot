'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { resumeService } from "@/services/resume";
import { ApiResponse } from "@/utils/ApiResponse";
import { normalResume } from "@/types/ResumeTypes";
import { isAxiosError } from "axios";
import { timeDiff } from "@/helpers/timeDiffConversion";
import { Skeleton } from "../ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setErrorState, setLoadingState, setResumes } from "@/stores/slice/resumeSlice";

export function RecentResumesCard() {

    const [isFetching, setIsFetching] = useState(false)
    const [resumeList, setResumeList] = useState<any[]>([])
    const [emptyMessage, setEmptyMessage] = useState("")
    const [error, setError] = useState("")
    const dispatch = useAppDispatch()

    useEffect(() => {
        setIsFetching(true)
        dispatch(setLoadingState("loading"))
        resumeService.getAllResumes<ApiResponse>().then((response) => {
            if (response.data.data) {
                let normalResume = response.data.data.normalResume
                let tailoredResume = response.data.data.tailoredResume
                if (normalResume) {
                    normalResume = normalResume.map((resume: any) => ({ ...resume, type: "base" }))
                    setResumeList(normalResume.slice(0, 2))
                }
                if (tailoredResume) {
                    tailoredResume = response.data.data.tailoredResume.map((resume: any) => ({ ...resume, type: "tailored" }))
                    setResumeList((prev) => ([...prev, ...tailoredResume.slice(0, 2)]))
                }
                dispatch(setResumes([...normalResume, ...tailoredResume]))
            }
            else {
                setEmptyMessage("No Resumes Uploaded Yet")
            }
        }).catch((error) => {
            if (isAxiosError(error)) {
                setError(error.response?.data.message)
                dispatch(() => {
                    setLoadingState("error")
                    setErrorState(error.response?.data.message)
                })
                console.log(error.message)
            }
        }).finally(() => { setIsFetching(false), dispatch(setLoadingState("success")) })
    }, [setResumeList])

    if (error) {
        return (
            <Card className="border-border bg-surface shadow-none lg:col-span-7">
                <CardContent className="h-full flex items-center justify-center">
                    <p className="font-semibold text-foreground text-xl">
                        {error}
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={`border-border bg-surface shadow-none lg:col-span-7`}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="heading-3">Recent resumes</CardTitle>
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
                                <Skeleton className="h-4 w-30" />
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-45" />
                                </div>
                                <Skeleton className="h-4 w-30" />
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-45" />
                                </div>
                                <Skeleton className="h-4 w-30" />
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-45" />
                                </div>
                                <Skeleton className="h-4 w-30" />
                            </div>
                        </div>
                        :
                        emptyMessage ?
                            <div className="h-60 flex items-center justify-center">
                                <p className="font-semibold text-foreground text-xl">{emptyMessage}</p>
                            </div>
                            :
                            resumeList.map((resume) => (
                                <div key={resume.id} className="flex items-center justify-between border-t border-border py-3 first:border-t-0">
                                    <div>
                                        <p className="font-semibold text-foreground">{resume.name ? resume.name : "Untitled Resume"}</p>
                                        <p className="text-sm text-muted">{timeDiff(resume.updatedAt)}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={`rounded-full border-0 font-mono text-[11px] bg-accent-soft text-accent-text`}>
                                            {resume.type}
                                        </Badge>
                                        {
                                            resume.atsScore === 0 ?
                                                <span className="number-sm text-foreground">Not Reviewed</span>
                                                :
                                                <span className="number-sm text-foreground pl-12">{resume.atsScore}/100</span>
                                        }
                                    </div>
                                </div>
                            ))
                }

            </CardContent>
        </Card>
    );
}