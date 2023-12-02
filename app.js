import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const app=express();
const  port=process.env.PORT
import cors from 'cors'
import connectDB from './config/connectdb.js';
app.use(cors());
import userRoutes from './routes/userRoutes.js'
const dataBaseUrl=process.env.DATABASE_URL;
connectDB(dataBaseUrl)
app.use(express.json());
app.use('/api/user',userRoutes)
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error${err}`);
    }
    else{
        console.log(`server is running on port ${port}`);
    }
})
