const express = require("express");
const studentController = require("../controllers/studentController");


const router = express.Router();

router.get("/", studentController.getData)

router.post("/", 
    studentController.postData)

router.patch("/:id", studentController.updateData)

router.delete("/:firstName", studentController.deleteData)

router.get("/:userId", studentController.getSpecificUser)

module.exports = router;