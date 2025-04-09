const express = require("express");
require("dotenv").config();
const multer = require("multer");
const app = express();
const cors = require('cors'); 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ItemRoutes = require("./Routes/ItemRoute");

const orderRoutes = require("./Routes/OrderRoute");
const imageRoutes = require("./Routes/ImageRoute");
const connectDB = require("./db");
const userRoutes = require("./Routes/UserRoute");
const cartRoutes = require("./Routes/CartRoute");

app.use(cors());
app.use(express.json());
app.use('/api/items', ItemRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/order', orderRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/user', userRoutes);
app.use('/images', express.static('uploads'));
app.use(upload.single("image"));
app.use(express.urlencoded({ extended: true })); // 🔥 Permet de lire les données des formulaires
// MongoDB connection



// Start server function
async function startServer() {
    await connectDB();
    
    app.get("/", (req, res) => {
        res.send("🚀 Node.js + MongoDB Cluster Connected!");
    });
  
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
}

startServer();
