const express=require('express');
const router=express.Router();
const Story=require('../models/Story');
const Comment=require('../models/Comment');


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


// Go to a songle story page
router.get('/:id',async (req,res)=>{
    try{
        const story=await Story.findById(req.params.id).populate('user') .populate({
            path:'comments',    
            
            populate:{
                path:'user'
            }
        }).lean();
        const comments=story.comments;
        if(!story)
        {
            return res.render('errors/404');
        }
        return res.render('stories/show',{
            story,
            comments
        });
    }catch(err)
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

// handle delte posts

router.delete('/:id',ensureAuth,async (req,res)=>{
    try{

    await Comment.deleteMany({story:req.params.id});
    await Story.remove({_id:req.params.id});
    
    return res.redirect('/dashboard');
    }catch(err)
    {
        console.log(err);
        res.render('errors/500');
    }
});




// getting all the stories from a user


router.get('/user/:id',ensureAuth,async (req,res)=>{
    try{ 
        var new_id=await mongoose.Types.ObjectId(req.params.id);
        console.log(req.params.id);
        const stories=await Story.find(
            {user:new_id,
            status:'public'})
            .populate('user')
            .lean();

            console.log(stories);
            const comments=[];
         res.render('stories/index',{
            stories,
            comments
        });

    }catch(err)
    {
        console.log(err);
        res.render('errors/500');
    }
});


// handle comments

router.post('/comments/add/:id',ensureAuth,async (req,res)=>{
    
    const story=await Story.findById(req.params.id);
    const comment=await Comment.create({
        body:req.body.commentBody,
        user:req.user.id,
        story:req.params.id
    });
    console.log("neeche hai iske");
    console.log(comment);
    await story.comments.push(comment._id);
    await story.save();
    // console.log(req.body);

    res.redirect(`/stories/${req.params.id}`)








});

module.exports=router;