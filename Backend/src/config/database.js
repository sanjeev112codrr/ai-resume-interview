const mongoose = require("mongoose")
const { ENV } = require("./env")


async function connectToDB() {

    try {
        await mongoose.connect(ENV.MONGO_URI)

        console.log("Connected to Database")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToDB