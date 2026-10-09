require('dotenv').config();
const express = require('express')
const cors = require('cors');
const connectDb = require('./config/mongoDb');
const mongoose = require('mongoose');
const connectCloudinary = require('./config/cloudinary');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const { connectRedis } = require('./config/redis');

// app config

const app = express();
const PORT  = process.env.PORT || 4000

//connect database
connectDb();
connectCloudinary();
connectRedis();

// middlewares
app.use(express.json())
app.use(cors())


// api endpoints
app.get('/', (req, res) =>{
    res.send("Server is running")
})

app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/coupon", couponRoutes)



mongoose.connection.once('open', () => {
    console.log('MongoDb connected');
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })
})

