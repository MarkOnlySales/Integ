const User = require("../schemas/User");
const userModel = require("../models/userModel")


module.exports = {
    getData: async (req, res) => {
        try {
            const users = await User.find();
    
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
            const name = req.params.firstName;
    
            await User.deleteOne({ firstName: name })
    
            return res.status(204).json()
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }
}