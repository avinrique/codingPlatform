const sendEmails = require('./../utils/email')
const User = require('./../models/usermodel')
const passport =  require('passport')
const { random } = require('lodash')
const { v4: uuidv4 } = require('uuid');
randurl = ""
exports.getlogincontrol = (req,res)=>{
    try {
        if(req.isAuthenticated()){
            res.redirect('/')
        }else{
            res.render('login' , {errormsg : ""})
        }
    } catch (error) {
        console.log(error)
    }   
 }
 exports.logincontrol =async (req,res)=>{
     
    try {
        const user =new User({
            email: req.body.email, 
            password: req.body.password
        })
       await req.login(user,function(err){
            if(err){
                console.log(err)
                res.render("invalid email or password ")
            }
            else{
                passport.authenticate('local')(req,res,function(){
                    res.redirect('/')
                })
            }
        })
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
     
}


 exports.getsignupcontrol = (req,res)=>{
    res.render('signup' , {errormsg : ""})
 }

 exports.signupcontrol = async(req,res)=>{
   
    try {
        if(req.body.password == req.body.passcode){

            randurl = uuidv4()

          
           badhttp = "http://192.168.137.1:80/authenticate/verify/"+randurl
            try{
                await sendEmails({
                    email  : req.body.email ,
                    subject : "verify email",
                    html : "<h1 style='color : red;'>Email Verify</h1>  <a href="+badhttp+">"+badhttp+"</a>"
                })
                console.log("the email was sent tried to sent to be specific")

               }catch(error){
                   console.log(error)
                   console.log("maybe email was not sent")
               }


            
        await  User.register({email : req.body.email, username: req.body.username, active :"false",randomurl : randurl  }, req.body.password,(err,user)=>{
            if(err){   
                console.log(err)
                res.render('signup',{errormsg : "email already taken"})
            }
            else{
                if(User.findOne({email : req.body.email , active : false}) != null ){
                    req.session.lau = req.body.email
                    console.log(req.lau)
                    console.log("sessions")
                    res.redirect('/authenticate/login')
                }else{
                    passport.authenticate('local')(req,res,function(){
                        res.redirect('/')
                        })
                }
            }
            console.log(user)
        })


    }else{
        res.render('signup', {errormsg : "password did not mached"})
    }
     } catch (error) {
         console.log(error)
         res.redirect('/')
     }
}
exports.getVerified = (req,res)=>{
    if(req.params.id == randurl){
        res.render('verify' , {
            check : req.params.id
        })
    }
}
exports.postVerified = (req,res)=>{   
    otp = req.body.otp 
    console.log("cause im sexy and i know it")
    User.findOneAndUpdate({randomurl : otp} , {userallowed: true} ,  (err,doc)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect('/')
            }
        })    
 

    
console.log(req.params)
console.log(randurl)


}
exports.Verify = (req,res)=>{
    console.log("avin")
}

 