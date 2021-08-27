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

router.get('/edit/:id',ensureAuth,async (req,res)=>{
    try{
        // handlebars cannot process without lean
        const story=await Story.findOne({_id:req.params.id}).lean();
        if(story)
        {    
            //    rectify this


            if(story.user==req.user.id)
            {
                res.render('stories/edit',{
                    story
                });
            }
            else
            {  
                // dont't render because here you dont have the posts
                res.redirect('/stories')
            }
        }
        else
        {
            res.render('errors/404')
        }
    }catch(err)
    {
        // one thing to notice is /link will redirect to absolute whule without / will take orefix of current url
        console.log(err);
        
        res.render('errors/500');
    }


});


router.put('/:id',ensureAuth,async (req,res)=>{
  
    // check if the ifd is valid or not
    try{
    const story =await Story.findById(req.params.id).lean();

    if(!story)
    {
        return res.render('errors/404');
    }

    if(story.user==req.user.id)
    {
      const newStory=await Story.findOneAndUpdate({_id:req.params.id},req.body,{
          new:true,
          runValidators:true
      });
      res.redirect('/dashboard');
    }
    else
    {
        res.redirect('/stories');
    }

    }catch(err)
    {
        console.log(err);
        res.render('errors/500');
    }
   
});



module.exports=router;