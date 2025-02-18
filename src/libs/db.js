const mongoose = require("mongoose");
require("dotenv").config();


const dbConnection = async(callback) => {
    try {
        let client = await mongoose.connect(process.env.MONGODB)

        if(client) {
            console.log("Database connected successfully")
            return callback(client)
        }
        return callback()
    }
    catch(error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnection;