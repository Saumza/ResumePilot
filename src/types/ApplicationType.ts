export interface application {
    id: string;
    userId: string | null;
    jobId: string;
    status: any;
    resumeId?: string;
    coverLetterId?: string;
    appliedAt: Date;
    companyName: string
    jobRole: string,
    jobUrl: string,
    createdAt: Date;
    updatedAt: Date;
}