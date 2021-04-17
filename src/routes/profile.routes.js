const app =require('express').Router()
const postsModel = require('../model/posts.model');
const postModel=require('../model/posts.model')
const usermodel=require('../model/user.model')
const moment = require('moment');


app.get('/profile', async(req, res) => {
    if(req.session.isloggedIn){
        let posts= await postModel.find({author:req.session.userID}).populate('author')
        let usid=req.session.userID
        let user = await usermodel.findOne({_id:usid})
        res.render('profile',{posts,user,ttt:"profile",moment: moment})
    }else{
        res.redirect('/login')
    }
 
});
app.post('/delete', async(req, res) => {

    console.log(req.body)
    await postsModel.findByIdAndDelete({_id:req.body._id})
    res.redirect('/profile')
});
app.post('/edit', async(req, res) => {
    const{_id,title,body}=req.body
    await postModel.findByIdAndUpdate({_id},{title,body})
    console.log(req.body)
    res.redirect('/profile')
});
module.exports=app