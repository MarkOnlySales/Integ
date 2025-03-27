const express = require("express");
const studentRouter = require("./routes/studentRouter")
const adminRouter = require("./routes/adminRouter")
const addressRouter = require("./routes/addressRouter")
const dbConnection = require("./libs/db");
const project = require("../package.json")

const app = express();

app.use(express.json());
app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/address", addressRouter);


app.get("/", (req, res) => {
    return res.json({
        status: "online",
        id: project.name,
        version: project.version
    })
})



dbConnection((client) => {
    if(client) {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server is running on port 3000");
        })
    }
    else {
        console.log("Database connection failed")
        process.exit(1)
    }
})