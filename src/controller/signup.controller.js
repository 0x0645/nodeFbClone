const{validationResult}=require('express-validator')
const usermodel=require('../model/user.model')
const bcrypt = require('bcrypt');
module.exports.rend= (req, res) => {   
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('signup',{ errors:req.flash('errors'),oldI:req.flash('oldI'),exists:req.flash('exists'),ttt:"signup" })
}
module.exports.reg= async (req, res) => {
    console.log(req.body)
    const {firstName,lastName,username,email,password}=req.body
    let error =validationResult(req)
    if (error.isEmpty()){
        let user = await usermodel.findOne({email})
        if(user){
            req.flash('exists',true)
            res.redirect('/')
        }else{
            bcrypt.hash(password,7, async (err, hash)=> {
                console.log({firstName,lastName,username,email,password:hash})
                await usermodel.insertMany({firstName,lastName,username,email,password:hash})
                res.redirect('/login')            
            });
        }
        
    } else{
        req.flash('errors',error.array())
        req.flash('oldI',{firstName,lastName,username,email,password})
        res.redirect('/')
    }
}