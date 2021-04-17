const moment = require('moment');
const postModel=require('../model/posts.model')
const usermodel=require('../model/user.model')

module.exports.homeRendering=async (req, res) => {
    let posts= await postModel.find({}).populate('author')
    let usid=req.session.userID
    let user = await usermodel.findOne({_id:usid})
    res.render('home.ejs',{posts,user,ttt:"home",moment: moment})
}

module.exports.logout=(req, res) => {
    req.session.destroy(()=>{
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

        res.redirect('/login')
    })
}
module.exports.addpost= async (req, res) => {
    console.log(req.body)
    const {title,body}=req.body
    await postModel.insertMany({title,body,author:req.session.userID})
    res.redirect('/home')
}