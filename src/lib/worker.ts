import { Worker, Job } from "bullmq";
import { taskQueue, deadLetterQueue } from "./queue";
import { redisClient } from "./redisConnect";
import { jobFind } from "./jobHandlers/jobFinding";
import { PermanentError } from "@/utils/PermanentError";

const worker = new Worker(
    "tasks",
    async (job: Job) => {
        switch (job.name) {
            case 'finding_job':
                //logging to find out if it is triggered manually or by cron and at what time for debugging if needed
                console.log(`Finding_Job Task is triggered by: ${job.data.triggeredBy} and at ${job.data.triggeredAt}`)
                return await jobFind(job)
            default:
                console.log(`Unknown Job Name: ${job.name}`)
                throw new PermanentError(`Unknown Job Name`)  //if the job name is not is undefined then throw error
        }
    },
    {
        connection: redisClient,
        maxStalledCount: 2
    }
)

worker.on(`completed`, (job: Job, result: any) => {
    console.log(`Job Completed.
        jobId: ${job.id},
        jobName: ${job.name},
        totalNumberOfJobsFeteched: ${result.jobsFetched}
        `)
})

worker.on(`failed`, async (job, error) => {

    const attemptsMade = job?.attemptsMade
    const maxAttempts = job?.opts.attempts
    const attemptsLeft = maxAttempts! - attemptsMade!

    // if the error is Permanent Error moving the task to DLQ because retrying is pointless, also manual intervention is needed!
    if (error instanceof PermanentError) {
        await deadLetterQueue.add(
            `dead-job`,
            {
                jobId: job?.id,
                jobName: job?.name,
                jobQueue: job?.queueName,
                payload: job?.data,
                errorMessage: error.message,
                failedAt: new Date()
            }
        )

        console.log(`JobId: ${job?.id}, Error Message: ${error.message}. Moving to DLQ for manual checking!`)
        return
    }

    // when attempts are left retrying the task. Logging here for debugging purposes!
    if (attemptsLeft !== 0) {
        console.log(`JobId: ${job?.id}, JobName: ${job?.name}, Attempts Made: ${attemptsMade}, Error Message: ${error.message}.
            Retrying after failure!`)
        return
    }

    // Maxattempts is reached, the job lands in the failed state. Moving the failed task to the DLQ for manual interventions and later reprocessing from there! Logging for debugging purpose!
    if (attemptsLeft === 0) {
        await deadLetterQueue.add(
            `dead-job`,
            {
                jobId: job?.id,
                jobName: job?.name,
                jobQueue: job?.queueName,
                payload: job?.data,
                errorMessage: error.message,
                failedAt: new Date()
            }
        )

        console.log(`JobId: ${job?.id}, JobName: ${job?.name}, Attempts Made: ${attemptsMade}, Error Message: ${error.message}.
                    Max retries reached. Moving task to Dead Letter Queue.`)
    }
})

worker.on(`stalled`, async (jobId) => {
    // stalled event listener fires when the task/job gets stalled/freezes and the lockduration doesn't get update.

    const job = await Job.fromId(taskQueue, jobId) //here the whole job object is not being returned, so using Job constructor to extract job info from the queue.
    console.log(`JobId: ${job?.id}, JobName: ${job?.name}, StalledCount: ${job?.stalledCounter}, StalledAt: ${new Date()}`)
})