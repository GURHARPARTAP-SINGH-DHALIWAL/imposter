const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const connectDB=require('./config/db');
const router = require('./routes');


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
// actually it tells hbs to handle files with .hbs extension
// Whwn we render a file express look for view engine and view set the layout file whihc is by default main in handlebars
app.engine('.hbs', exphbs({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static('public'));

// Set up routes
app.use('/',require('./routes/index'));

const port=process.env.PORT||8000;


app.listen(port,()=>console.log(`Server is Up and Running in ${process.env.NODE_ENV} on port ${port}`));