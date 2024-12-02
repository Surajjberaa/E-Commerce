import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import authRouter from './routes/auth/auth-routes.js'
import adminProductsRouter from './routes/admin/product-routes.js'
import adminOrderRouter from './routes/admin/order-routes.js'
import shopProductsRouter from './routes/shop/products-routes.js'
import shopCartRouter from './routes/shop/cart-routes.js'
import shopAddressRouter from './routes/shop/address-routes.js'
import shopOrderRouter from './routes/shop/order-routes.js'
import shopSearchRouter from './routes/shop/search-routes.js'
import shopReviewRouter from './routes/shop/review-routes.js'

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL).then(() => {
    console.log("Mongo is connected");
}).catch((error) => {
    console.log(error);

})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "https://e-commerce-xi-pearl.vercel.app",
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/admin/orders', adminOrderRouter)
app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/shop/search', shopSearchRouter)
app.use('/api/shop/review', shopReviewRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hi from server"
    })
})

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);

})