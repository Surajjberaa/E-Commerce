import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import authRouter from './routes/auth/auth-routes.js'

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
        origin: "http://localhost:5173",
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

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hi from server"
    })
})

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);

})