const app =require('express').Router()
const validation=require('../validator/signup.validation')
const auth =require('../middleware/auth')
const sinupcc=require('../controller/signup.controller') 
app.get('/', auth.alreadylogedin,sinupcc.rend);
app.post('/reqister',validation,sinupcc.reg);
module.exports=app