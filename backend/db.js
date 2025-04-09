const mongoose = require("mongoose");

const uri = 'mongodb+srv://sarahmediouni4:JFCIoZiYbavivnNr@cluster0.zdz9o8e.mongodb.net/Dari?retryWrites=true&w=majority&appName=Cluster0'; 

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB Atlas (Dari database)");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
