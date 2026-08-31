import { redisConnection } from "@/lib/redisConnect"
import { Queue } from "bullmq"

const taskQueue = new Queue("tasks", { connection: redisConnection })

const deadLetterQueue = new Queue("tasks:DLQ", { connection: redisConnection })

export { taskQueue, deadLetterQueue }