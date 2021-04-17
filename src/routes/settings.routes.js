const app =require('express').Router()
const{validationResult}=require('express-validator')
const validation=require('../validator/settings.validation')
const usermodel=require('../model/user.model')
const bcrypt = require('bcrypt');
app.get('/settings', async(req, res) => {
    if(req.session.isloggedIn){
        let usid=req.session.userID
        let user = await usermodel.findOne({_id:usid})
        res.render('settings',{ errors:req.flash('errors'),match:req.flash('match'),ttt:"settings",user})
    }else{
        res.redirect('/login')
    }

});
app.post('/changepassword',validation, async (req, res) => {
    const {oldpass,newpass,repass}=req.body
    let error =validationResult(req)
    // if (error.isEmpty()){
        let usid=req.session.userID
        // console.log(usid)
        let user = await usermodel.findOne({_id:usid})
        // console.log(user)
        if(user){
            let match =bcrypt.compareSync(oldpass, user.password)
            if (match){
                if(error.isEmpty()){
                    bcrypt.hash(newpass,7, async (err, hash)=> {
                        await usermodel.findOneAndUpdate({_id:usid},{password:hash})
                        req.session.destroy(()=>{
                        res.redirect('/login')})
                    });
                }else{
                    console.log(error.array())
                    req.flash('errors',error.array())
                    res.redirect('/settings')
                }

            }else{
                req.flash('match',true)
                res.redirect('/settings')            }

            // req.flash('exists',true)
            // res.redirect('/test')
        }else{
        
            res.redirect('/test2')

        }
        
    // } else{
    //     req.flash('errors',error.array())
    //     req.flash('oldI',{firstName,lastName,username,email,password})
    //     res.redirect('/')
    // }
    // console.log(error)
    console.log(req.body)
});
module.exports=app