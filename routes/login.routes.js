const app =require('express').Router()
const auth =require('../middleware/auth')
const logincontroller=require('../controller/login.controller')
app.get('/login',auth.alreadylogedin ,logincontroller.login);
app.post('/signin',logincontroller.signin);
module.exports=app