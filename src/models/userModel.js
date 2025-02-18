const User = require("../schemas/User");
const { hashPassword } = require("../utils/authUtils");


module.exports = {
    createUser: async (firstName, lastName, password, email, age) => {

        const payload = {
            firstName,
            lastName,
            password: await hashPassword(password),
            email,
            age
        }
    
        return await User.create(payload)
    }
}