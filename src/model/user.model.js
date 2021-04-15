const mongoose=require("mongoose")
const userScgema= mongoose.Schema(
    {
        fistName:String,
        lastName:String,
        email:String,
        password:String
    }
)
module.exports=mongoose.model('user',userScgema)