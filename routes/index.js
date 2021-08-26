const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    res.render('login',{
        layout:'login'
    });
});


router.get('/dashboard',(req,res)=>{
    res.render('dashboard');
});

// handle logut
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports=router;