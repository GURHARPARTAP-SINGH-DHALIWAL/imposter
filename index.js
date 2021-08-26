const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const connectDB=require('./config/db');
const router = require('./routes');
const passport=require('passport');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose =require('mongoose');

dotenv.config({path:"./config/config.env"});


require('./config/passport')(passport);   

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

// express sessions

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //     mongoUrl: mongoose.connection
    // },function(err){
    //     console.log(err||"MongoStore is Working proprly");
    // })
   
  }));

//   Passport middleware


app.use(passport.initialize());
app.use(passport.session());


app.use(express.static('public'));

// Set up routes
app.use('/auth',require('./routes/auth'));
app.use('/',require('./routes/index'));


const port=process.env.PORT||8000;


app.listen(port,()=>console.log(`Server is Up and Running in ${process.env.NODE_ENV} on port ${port}`));