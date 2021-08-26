module.exports={
    // function for preventing to go to dashboard
    ensureAuth:function(req,res,next)
    {
        if(req.isAuthenticated())
        {
            return next();
        }
        else
        {
            return res.redirect('/');
        }
    },

    // if a logged in user tries to go to login page then this function is fired

    ensureGuest:function(req,res,next)
    {
        if(req.isAuthenticated())
        {
            return res.redirect('/dashboard');
        }
        else
        {
            return next();
        }
    }
}