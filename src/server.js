const express = require("express");
const studentRouter = require("./routes/studentRouter")
const adminRouter = require("./routes/adminRouter")
const dbConnection = require("./libs/db");

const app = express();

app.use(express.json());
app.use("/student", studentRouter);
app.use("/admin", adminRouter);


dbConnection((client) => {
    if(client) {
        app.listen(process.env.PORT, () => {
            console.log("Server is running on port 3000");
        })
    }
    else {
        console.log("Database connection failed")
        process.exit(1)
    }
})