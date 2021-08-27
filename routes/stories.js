const express=require('express');
const router=express.Router();
const Story=require('../models/Story');


const {ensureAuth,ensureGuest}=require('../middleware/auth');
const mongoose = require('mongoose');


router.get('/add',ensureAuth,(req,res)=>{

    // it looks in views by default if there is any path mention it
    res.render('stories/add');
});

router.post('/',async (req,res)=>{
    try{
    req.body.user=req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
    }catch(err)
    {
        console.log(err);
        res.render('errors/500');
    }
});
   

// give all public pots
router.get('/',async (req,res)=>{
    try{
        // 
    const stories=await Story.find({status:'public'}).populate('user').sort({createdAt:'desc'}).lean();
    res.render('stories/index',{
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