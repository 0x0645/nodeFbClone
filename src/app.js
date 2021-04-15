const express = require('express')
const path = require('path')
const mongoose=require("mongoose")

var session = require('express-session')
var flash = require('connect-flash');

const app = express()


const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded( {extended:false} ))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))
app.use(flash())
app.use(require('./routes/signup.routes'))
app.use(require('./routes/login.routes'))
mongoose.connect('mongodb://localhost:27017/exam', { useNewUrlParser: true,useUnifiedTopology:true }).then(()=>{
    console.log("db connected")
}).catch(error => handleError(error)); 
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});