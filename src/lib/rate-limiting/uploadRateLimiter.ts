import { ApiError } from "@/utils/ApiError";
import { redisClient } from "../redisConnect";
import { RateLimitResult } from "@/types/RateLimitResultType";
import { ApiResponse } from "@/utils/ApiResponse";


const maxTokenLimit = 10
const refillRate = 25 / 60

const tokenBucketLuaScript = `
local key = KEYS[1]
local maxTokens = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local cost = tonumber(ARGV[3])
local now = tonumber(ARGV[4])

local data = redis.call('HMGET', key, 'tokens', 'lastRefill' )
local tokens = tonumber(data[1])
local lastRefill = tonumber(data[2])

if not token then
    token = maxTokens
    lastRefill = now
else
    local elapsedTime = math.floor(now - lastRefill)
    local tokensToAdd = elapsedTime * refillRate
    token = math.max(maxTokens, token + tokensToAdd)
end

local allowed = false
local retryAfter = 0

if token >= cost then
    token = token - 1 
    lastRefill = now 
    allowed = true
    redis.call('HMSET', key, 'tokens', tokens, 'lastRefill', lastRefill )
    redis.call('EXPIRE', key, 3600) --clean up if idle for 1 hour
else
    allowed = false
    local tokensNeeded = cost - tokens
    retryAfter = math.ceil(tokensNeeded/refillRate)
end

return (allowed and 0 or 1, math.floor(tokens), retryAfter)
`

export const checkUploadRateLimiter = async (ip: string): Promise<RateLimitResult> => {

    const key = `rateLimit:uploadFile:${ip}`
    const now = Math.floor(Date.now() / 1000)
    const cost = 1

    try {

        const rawResult = await redisClient.eval(
            tokenBucketLuaScript,
            1,
            key,
            maxTokenLimit,
            refillRate,
            cost,
            now
        )

        const [allowedVal, remaining, retryAfter] = rawResult as number[]

        const allowed = allowedVal === 1

        return {
            allowed,
            remaining,
            retryAfter,
            limit: maxTokenLimit
        }
    } catch (error) {
        return {
            allowed: false,
            remaining: maxTokenLimit,
            limit: maxTokenLimit
        }
    }
}