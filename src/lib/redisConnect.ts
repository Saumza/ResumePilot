import { Redis } from "ioredis"

export const redisConnection = new Redis({
    host: process.env.REDIS_URL,
    maxRetriesPerRequest: null
})

redisConnection.on("connect", () => {
    console.log("Redis Connected")
})

redisConnection.on("error", (err) => {
    console.log(`Redis Err: ${err}`)
})