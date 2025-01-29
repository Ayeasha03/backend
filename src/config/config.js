const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING,
        );
        console.log("Connecting to:", process.env.DB_STRING);

        console.log("MongoDB connected");
    } catch (err) {
        console.error("DataBase connection error:",err.message);
        process.exit(1);
    }
}


module.exports = connectDB;