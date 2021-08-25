const express=require('express');

const dotenv=require('dotenv');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const connectDB=require('./config/db');


dotenv.config({path:"./config/config.env"});

// connect our database
connectDB();

const app=express();

// for logging as it will help in debugging 
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
}


// Set up HBS
// setting the extension as .hbs  
app.engine('.hbs', exphbs({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');



const port=process.env.PORT||8000;


app.listen(port,()=>console.log(`Server is Up and Running in ${process.env.NODE_ENV} on port ${port}`));