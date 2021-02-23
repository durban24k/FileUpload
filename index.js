require('dotenv').config({path:'./.env'});
const express=require('express');
const logger=require('morgan');
const path=require('path');
const file_upload=require('express-fileupload');

// Initiate Express Application
const app=express();

// Setting the View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

// MiddleWare
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(logger('combined'));

// Port Listening
const port=process.env.PORT || 3000;

app.listen(port,()=>{
     console.log(`Server Listening on port ${port}`);
});