const express=require('express');
const router=express.Router();
const Story=require('../models/Story');


const {ensureAuth,ensureGuest}=require('../middleware/auth');
const mongoose = require('mongoose');


router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    });
});


router.get('/dashboard',ensureAuth,async (req,res)=>{
    

    // check difference between _id and id  
    // lean improves performance as it does not links unnecessary mongoose functiions such as sace and other header it is retiurned as plain javasrpit object of data not mongoose document
    try{
    const stories=await mongoose.find({user:req.user.id}).lean();

    res.render('dashboard',{
        name:req.user.firstName,
        stories
    });
    }
    catch(err)
    {
        console.log(err);
        res.render('errors/500');
    }
});



module.exports=router;