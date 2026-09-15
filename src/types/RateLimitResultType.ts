export interface RateLimitResult {
    allowed: boolean;           // was the request permitted?
    remaining: number;          // how many requests are left in the current window/bucket
    limit: number;              // the configured maximum
    retryAfter?: number | null;  // seconds until the client should retry (null if allowed)
    delay?: number | null;      // optional wait time (leaky bucket shaping mode)
}