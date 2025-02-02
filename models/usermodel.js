const mongoose  = require("mongoose");
const crypto = require('crypto')
var validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate');
const { random } = require("lodash");
const UserSchema = new mongoose.Schema({
        email : {
           type : String ,
            minlength : 4 , 
            maxlength : 25 ,
            trim : true , 
            default : "N  /  A",
            unique : true ,
        }, 
        active : {
            type : Boolean,
            default : false
        },
        USN : { //
            type : String , 
            unique : true , 
            require : true ,
        } ,
        fname : {
            type : String , 
            minlength : 3  ,
            maxlength  : 20 
           
        },
        lname : {
            type : String , 
            minlength : 2  ,
            maxlength  : 15 
           
        },
        usertype: {
            type : String ,
            default: "user",
            enum : ["user","admin","official"]
        },
        userallowed : {
            type : Boolean, 
            default : false ,
        },

        dataid : {
            type : String 
        }
        ,
        Department : {
            type : String ,
            default : "N/A"
        },
        Year : {
            type : String ,
            default : 0
        }
        ,
        Rollno : {
            type : String ,
            
        },  
        Semester: {
            type : Number ,
        },

        password : String ,
        phonecode :{
            type : String ,
            maxlength : 4
        } ,
        location :{
            type : String
        },
        phone : {
        type : Number ,
        minlength : 10 ,
        maxlength : 10
        } ,
            imageurl : {
            type : String ,
            default : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
        },
        created : {
            type : Date , 
            default : Date.now()
        },
        randomurl : {
            type : String ,
        },
        passwordresettoken : String ,
        passwordresetdate : Date ,
   
  
    //USN==> location + Year + Dept + Rollno
    //1BY22CS001==> BY + 22 + CS + 001 
   
})

UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' })
UserSchema.plugin(findOrCreate)
UserSchema.methods.createpasswordresettoken = function(){
const resetToken = crypto.randomBytes(32).toString('hex');
this.passwordresettoken = crypto
.createHash('sha256')
.update(resetToken)
.digest('hex')

this.passwordresetdate = Date.now() + 10 *60*1000
console.log(resetToken , this.passwordresettoken)


return resetToken

}
const User =  mongoose.model('User', UserSchema)
module.exports = User