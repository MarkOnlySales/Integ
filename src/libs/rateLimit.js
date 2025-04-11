const { rateLimit} = require('express-rate-limit');

const limiter1 = rateLimit({
    windowMs: 1* 60 * 1000, // 1 minute,
    max: 10,
    message: (req, res) => {
        return res.json({ message: "Giatay abusar, sumusobra kana giatay. Hulat pls "})
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
})


const limiter2 = rateLimit({
    windowMs: 1* 60 * 1000, // 1 minute,
    max: 5,
    message: (req, res) => {
        return res.json({ message: "Giatay abusar, sumusobra kana giatay. Hulat pls "})
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
})


module.exports = { limiter1, limiter2 }