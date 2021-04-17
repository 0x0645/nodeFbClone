const bcrypt = require('bcrypt');
const usermodel=require('../model/user.model')
module.exports.login=(req, res) => {

    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('login',{ exists:req.flash('exists'),wrong:req.flash('wrong') ,ttt:"login"})

}

module.exports.signin= async(req, res) => {
    const {email,password}=req.body
    let user= await usermodel.findOne({email})
    console.log("here")

    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            req.session.isloggedIn=true
            req.session.userID=user._id
            res.redirect('/home')

        }else{
            req.flash('wrong',true)

            res.redirect('/login')
        }
    }else{
        req.flash('exists',true)
        res.redirect('/login')
    }

}