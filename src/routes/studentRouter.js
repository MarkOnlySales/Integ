const express = require("express");
const studentController = require("../controllers/studentController");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", studentController.getData)

router.post("/", 
    body("firstName").isString().isLength({ min: 3 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Invalid firstName"})
        }
    },
    body("lastName").isString().isLength({ min: 3 }),
    studentController.postData)

router.patch("/:id", studentController.updateData)

router.delete("/:firstName", studentController.deleteData)

module.exports = router;