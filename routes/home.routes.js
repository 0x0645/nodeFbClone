const app =require('express').Router()
const auth =require('../middleware/auth')
const homecontroller=require('../controller/home.controller')
app.get('/home',auth.needLogin,homecontroller.homeRendering );
app.get('/logout',homecontroller.logout);
app.post('/addpost',homecontroller.addpost);
module.exports=app