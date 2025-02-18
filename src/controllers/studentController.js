const User = require("../schemas/User");


const getData = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({ data: users })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const postData = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.create(data)

        return res.status(201).json({ newUser: user })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const updateData = async (req, res) => {
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
}

const deleteData = async (req, res) => {
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


module.exports = { getData, postData, updateData, deleteData };