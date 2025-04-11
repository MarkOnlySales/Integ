const User = require("../schemas/User");
const userModel = require("../models/userModel")
const { getIo } = require("../libs/socket")


module.exports = {
    getData: async (req, res) => {
        try {
            const { userId } = req.query;

            const users = await User.find();

            const io = getIo()

            if (userId) {
                io.emit("users123", { users })
            }
    
            res.status(200).json({ data: users })
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    },
    postData: async (req, res) => {
        try {
            const data = req.body;
    
            const user = await userModel.createUser(data.firstName, data.lastName, data.password, data.email, data.age)
    
            return res.status(201).json({ newUser: user })
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    },
    updateData:  async (req, res) => {
        try {
            const data = req.body;
            const id = req.params.id;
    
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
    
            return res.json({ updatedUser })
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    },
    deleteData: async (req, res) => {
        try {
            const id = req.params.id;
    
            await User.deleteOne({ _id: id })
    
            return res.status(204).json()
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    },
    getSpecificUser: async (req, res) => {
        try{
            const userId = req.params.userId;

            const user = await userModel.getUserById(userId)

            return res.status(200).json({ user })
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: error.message })
        }
    }
}