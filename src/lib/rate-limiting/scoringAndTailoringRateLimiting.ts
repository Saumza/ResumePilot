import { redisClient } from "../redisConnect";
import { RateLimitResult } from "@/types/RateLimitResultType"


const maxTokenLimit = 10
const refillRate = 15 / 60

const tokenBucketLuaScript = `
local key = KEYS[1]
local maxTokens = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local cost = tonumber(ARGV[4])

local data = redis.call('HMGET', key, tokens, lastRefill)
local tokens = tonumber(data[1])
local lastRefill = tonumber(data[2])

if not tokens then
    tokens = maxTokens
    lastRefill = now
else
    local elapsedTime = math.floor(now - lastRefill)
    local tokensToAdd = elapsedTime * refillRate
    tokens = math.min(maxTokens, tokens + tokensToAdd)
end

local allowed = false
local retryAfter = 0

if tokens >= cost then
    tokens = tokens - cost 
    lastRefill = now
    allowed = true
    redis.call('HMSET', key, 'tokens', tokens, 'lastRefill', lastRefill)
    redis.call('EXPIRE', key, 3600) --clean up if idle for 1 hour
else
    allowed = false
    local tokensNeeded = cost - tokens
    retryAfter = math.ceil(tokensNeeded/refillRate)
end

return {allowed and 1 or 0, math.floor(tokens), retryAfter }
`

export const aiFeatureRateLimiter = async (ip: string): Promise<RateLimitResult> => {

    const key = `rateLimit:apiCall:${ip}`
    const now = Date.now() / 1000
    const cost = 1

    try {
        const rawResult = await redisClient.eval(
            tokenBucketLuaScript,
            1,
            key,
            maxTokenLimit,
            refillRate,
            now,
            cost
        )

        const [allowedReq, remaining, retryAfter] = rawResult as number[]

        const allowed = allowedReq === 1

        return {
            allowed,
            remaining,
            retryAfter,
            limit: maxTokenLimit
        }
    } catch (error) {
        console.error('Failing Open to user for their request throughput', error)

        return {
            allowed: true,
            remaining: maxTokenLimit,
            limit: maxTokenLimit
        }

    }
}