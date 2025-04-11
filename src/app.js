const express = require("express")
const cors = require("cors")


module.exports = function expressApp () {
    const app = express()

    app.use(express.json()).use(express.urlencoded( { extended: true }))
    app.use(cors( { origin: "*" }))

    return app
}