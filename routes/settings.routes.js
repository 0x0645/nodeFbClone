const app =require('express').Router()
const validation=require('../validator/settings.validation')
const auth =require('../middleware/auth')
const settingscontroller=require('../controller/settings.controller') 
app.get('/settings',auth.needLogin,settingscontroller.rednder);
app.post('/changepassword',validation,settingscontroller.changepass);
module.exports=app