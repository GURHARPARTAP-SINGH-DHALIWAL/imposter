const express=require('express');
const router=express.Router();
const Story=require('../models/Story');


const {ensureAuth,ensureGuest}=require('../middleware/auth');
const mongoose = require('mongoose');


router.get('/add',ensureAuth,(req,res)=>{
    
    // it looks in views by default if there is any path mention it
    res.render('stories/add');
});


router.get('/dashboard',ensureAuth,async (req,res)=>{
    

    // check difference between _id and id  
    // lean improves performance as it does not links unnecessary mongoose functiions such as sace and other header it is retiurned as plain javasrpit object of data not mongoose document
    try{
    const stories=await Story.find({user:req.user.id}).lean();

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