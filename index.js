require('dotenv').config({path:'./.env'});
const express=require('express');
const logger=require('morgan');
const file_upload=require('express-fileupload');

// Initiate Express Application
const app=express();