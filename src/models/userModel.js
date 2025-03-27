const User = require("../schemas/User");
const mongoose = require("mongoose");
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
    },
    getUserById: async (userId) => {

        pipeline = [
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "addresses",
                  localField: "_id",
                  foreignField: "userId",
                  as: "address"
                }
            },
            {
              $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                  path: "$address",
                  preserveNullAndEmptyArrays: true
                }
            },
            {
              $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                  firstName: 1,
                  lastName: 1,
                  email: 1,
                  street: "$address.street",
                  city: "$address.city",
                  zipCode: "$address.zipCode"
                }
            }
          ]

        const user = await User.aggregate(pipeline)
        
        if (user.length === 0) {
            throw new Error("User not found")
        }

        return user[0]
    }
}