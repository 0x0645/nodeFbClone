const{validationResult}=require('express-validator')
const usermodel=require('../model/user.model')
const bcrypt = require('bcrypt');

module.exports.changepass= async (req, res) => {
    const {oldpass,newpass,repass}=req.body
    let error =validationResult(req)
        let usid=req.session.userID
        let user = await usermodel.findOne({_id:usid})
        if(user){
            let match =bcrypt.compareSync(oldpass, user.password)
            if (match){
                if(error.isEmpty()){
                    bcrypt.hash(newpass,7, async (err, hash)=> {
                        await usermodel.findOneAndUpdate({_id:usid},{password:hash})
                        req.session.destroy(()=>{
                        res.redirect('/login')})
                    });
                }else{
                    console.log(error.array())
                    req.flash('errors',error.array())
                    res.redirect('/settings')
                }
            }else{
                req.flash('match',true)
                res.redirect('/settings')            }
        }else{
            res.redirect('/test2')
        }
    console.log(req.body)
}
module.exports.rednder=  async(req, res) => {
    let usid=req.session.userID
    let user = await usermodel.findOne({_id:usid})
    res.render('settings',{ errors:req.flash('errors'),match:req.flash('match'),ttt:"settings",user})


}