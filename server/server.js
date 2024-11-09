const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config();


const DATABASE_URL = process.env.DATABASE_URL


mongoose.connect(DATABASE_URL).then(()=>{
    console.log("Mongo is connected");
}).catch((error)=>{
    console.log(error);
    
})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173/",
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

app.listen(PORT, ()=> {
    console.log("Server is running on " + PORT);
    
})