const express=require('express');
const Router=express.Router();


Router.get('/',(req,res)=>{
     res.render("file")
});

Router.post('/',(req,res)=>{
     console.log(req.body);
     console.log(req.files);

     const {
          name
     }=req.body;
     if(!req.files){
          req.flash('alert_msg','No Profile Picture Was Added!!');
          res.redirect('/file')
     }else{
          const dp=req.files.profile_image;
          const image_name=dp.name;

          if(dp.mimetype=="image/jpeg" || dp.mimetype=="image/png"){
               dp.mv(`./public/images/profile/${image_name}`,(err)=>{
                    if (err) return res.status(500).send(err);
                    const db=require('../config/db');
                    const sql="INSERT INTO images SET ?";
                    const timestamp=Date.now();
                    db.query(sql,{name,image_url:image_name,created_at:timestamp,updated_at:timestamp},(error,results,fields)=>{
                         if(error) throw error;
                         req.flash('success_msg','Image Added Successfully!');
                         res.redirect('/file');
                    });
               });
          }else{
               req.flash('alert_msg','This format is not allowed , please upload file with ".png",".gif",".jpg"');
               res.redirect('/file');
          }
     }
});

Router.get('/profile',(req,res)=>{
     res.render('profile');
});

Router.post('/profile',(req,res)=>{
     console.log(req.body);zoom
});

module.exports = Router;