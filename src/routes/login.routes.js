const app =require('express').Router()
const bcrypt = require('bcrypt');

const usermodel=require('../model/user.model')

app.get('/login', (req, res) => {
    res.render('login',{ exists:req.flash('exists'),wrong:req.flash('wrong') })
});
app.post('/signin', async(req, res) => {
    const {email,password}=req.body
    let user= await usermodel.findOne({email})
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            res.redirect('/home')
        }else{
            req.flash('wrong',true)
            res.redirect('/login')
        }
    }else{
        req.flash('exists',true)
        res.redirect('/login')
    }

});
module.exports=app