import { redisClient } from "@/lib/redisConnect"
import { Queue } from "bullmq"

const taskQueue = new Queue("tasks", { connection: redisClient })

const deadLetterQueue = new Queue("tasks-DLQ", { connection: redisClient })

export { taskQueue, deadLetterQueue }