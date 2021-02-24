require('dotenv').config({path:'./.env'});
const express=require('express');
const logger=require('morgan');
const path=require('path');
const fileUpload=require('express-fileupload');
const flash=require('express-flash');
const session=require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Initiate Express Application
const app=express();

// Setting the View Engine
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

// MiddleWare
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(logger('combined'));
app.use(fileUpload());

const Index=require('./routes/file');

// Express Sessions
const options = {
     host: process.env.DB_HOST,
     port: process.env.DB_PORT,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB
};
const sessionStore = new MySQLStore(options);

// express-session
app.use(session({
     secret: process.env.SESSION_KEY,
     store: sessionStore,
     resave: false,
     saveUninitialized: false,
     // cookie: {
     //      maxAge: 1000*60*60*24,
     //      secure:true,
     // }
}));
// Express Flash
app.use(flash());

app.use('/file',Index);

// Port Listening
const port=process.env.PORT || 3000;

app.listen(port,()=>{
     console.log(`Server Listening on port ${port}`);
});