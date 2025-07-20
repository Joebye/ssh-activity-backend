import rateLimit from "express-rate-limit";

const limiter = rateLimit ({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({error_message: "Oops, you have reached the max limit of reqiests. Please try again later."});
    },
})

export default limiter;