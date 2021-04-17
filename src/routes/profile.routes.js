const app =require('express').Router()
const auth =require('../middleware/auth')
const profilecontroller=require('../controller/profile.controller') 


app.get('/profile',auth.needLogin,profilecontroller.renderr);
app.post('/delete',profilecontroller.delete);
app.post('/edit',profilecontroller.edit);
module.exports=app