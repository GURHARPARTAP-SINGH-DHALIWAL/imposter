const express=require('express');

const dotenv=require('dotenv');

const connectDB=require('./config/db');


dotenv.config({path:"./config/config.env"});

// connect our database
connectDB();

const app=express();

const port=process.env.PORT||8000;


app.listen(port,()=>console.log(`Server is Up and Running in ${process.env.NODE_ENV} on port ${port}`));