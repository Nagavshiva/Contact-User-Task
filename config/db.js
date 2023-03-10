const mongoose = require("mongoose");


const connectToDb = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true})
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectToDb;