const addressModel = require("../models/addressModel");


module.exports = {
    createAddress: async (req, res) => {
        try {
            const data = req.body;

            const address = await addressModel.createAddress(data)

            return res.status(201).json({ newAddress: address })
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }
}