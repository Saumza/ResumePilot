import { Redis } from "ioredis"

const globalforRedis = globalThis as unknown as { redis: Redis }

let redisClient: Redis

if (process.env.NODE_ENV === "production") {
    redisClient = new Redis(process.env.REDIS_URL!, {
        maxRetriesPerRequest: null
    })

    redisClient.on("connect", () => {
        console.log("Redis Connected")
    })

    redisClient.on("error", (err) => {
        console.log(`Redis Err: ${err}`)
    })
}

else {
    if (!globalforRedis.redis) {
        globalforRedis.redis = new Redis(process.env.REDIS_URL!,{
            maxRetriesPerRequest: null
        })
    }
    redisClient = globalforRedis.redis

    redisClient.on("connect", () => {
        console.log("Redis Connected")
    })

    redisClient.on("error", (err) => {
        console.log(`Redis Err: ${err}`)
    })
}

export { redisClient }