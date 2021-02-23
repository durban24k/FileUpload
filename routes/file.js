const express=require('express');
const Router=express.Router();


Router.get('/',(req,res)=>{
     res.render("file")
});

Router.post('/',(req,res)=>{
     console.log(req.body);
     console.log(req.files.profile_image);
});

module.exports = Router;