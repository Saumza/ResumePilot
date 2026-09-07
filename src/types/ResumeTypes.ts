export interface normalResume {
    id: string;
    name: string | null;
    ownerId: string;
    rawText: string;
    resumeUrl: string;
    publicId: string;
    aiReviewed: boolean;
    aiInsights?: any
    atsScore: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface tailoredResume {
    id: string;
    name: string | null;
    jobDescription: string | null;
    resumeData: any;
    aiInsights: any;
    atsScore: number | null;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    jobId: string | null;
    originalResumeId: string;
}