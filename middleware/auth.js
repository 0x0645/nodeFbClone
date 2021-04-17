module.exports.needLogin=(req,res,next)=>{
    if(req.session.isloggedIn){
        next()
    }else{
        res.redirect('/login')
    }

};

module.exports.alreadylogedin=(req,res,next)=>{
    if(req.session.isloggedIn){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.redirect('/home')
    }else{
        next()
    }

}

