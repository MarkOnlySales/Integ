const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({message: "Hello from the admin router"});
})

router.post("/", (req, res) => {
    const data = req.body;

    res.json({message: "Data admin", data: data});
})

module.exports = router;