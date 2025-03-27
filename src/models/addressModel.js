const Address = require("../schemas/Address");

module.exports = {
    createAddress: async (payload) => {
    
        return await Address.create(payload)
    }
}