import setRateLimit from "express-rate-limit";
const maxLimit = 15;
// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: maxLimit,
    message: `You have exceeded your ${maxLimit} requests per minute limit.`,
    headers: true,
});

export default rateLimitMiddleware;
