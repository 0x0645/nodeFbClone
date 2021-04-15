const app =require('express').Router()
const{validationResult}=require('express-validator')
const validation=require('../validator/signup.validation')
const usermodel=require('../model/user.model')
const bcrypt = require('bcrypt');

app.get('/', (req, res) => {    
    res.render('signup',{ errors:req.flash('errors'),oldI:req.flash('oldI'),exists:req.flash('exists') })

});

app.post('/reqister',validation, async (req, res) => {
    const {firstName,lastName,username,email,password}=req.body
    let error =validationResult(req)
    if (error.isEmpty()){
        let user = await usermodel.findOne({email})
        if(user){
            req.flash('exists',true)
            res.redirect('/')
        }else{
            bcrypt.hash(password,7, async (err, hash)=> {
                await usermodel.insertMany({firstName,lastName,username,email,password:hash})
                res.redirect('/login')            
            });

        }
        
    } else{
        req.flash('errors',error.array())
        req.flash('oldI',{firstName,lastName,username,email,password})
        res.redirect('/')
    }
});
module.exports=app