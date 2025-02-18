const express = require("express");
const { getData, postData, updateData, deleteData } = require("../controllers/studentController");

const router = express.Router();

router.get("/", getData)

router.post("/", postData)

router.patch("/:id", updateData)

router.delete("/:firstName", deleteData)

module.exports = router;