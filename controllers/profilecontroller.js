const User = require('./../models/usermodel')

exports.getprofilecontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        const Userprofile = await User.findById({_id : req.user.id})
        if(!Userprofile){
            console.log("no data found")
        }else{
            
            res.render('profile' ,{name : Userprofile.fname  ,email : Userprofile.email, USN : Userprofile.USN ,  pic : Userprofile.imageurl ,location : Userprofile.location ,phone :Userprofile.phone , department : Userprofile.Department , sem : Userprofile.Semester , year : Userprofile.Year , rollno : Userprofile.Rollno , usertype : Userprofile.usertype })
        }
    }else{
        res.redirect('/')
    } 
}

exports.getprofile_editcontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        
        const Userprofile = await User.findById({_id : req.user.id})
        if(!Userprofile){
            console.log("no data found")
        }else{
            
            res.render('profile_edit' ,{name : Userprofile.fname  ,email : Userprofile.email, USN : Userprofile.USN ,  pic : Userprofile.imageurl ,location : Userprofile.location ,phone :Userprofile.phone , department : Userprofile.Department , sem : Userprofile.Semester , year : Userprofile.Year , rollno : Userprofile.Rollno , usertype : Userprofile.usertype })
        }
    }else{
        res.redirect('/')
    } 
}
exports.profile_editcontrol = async(req,res)=>{
    console.log("profile edit control testing")
    if(req.isAuthenticated()){
       if(!req.file){
         UpadteProfile = await User.findOneAndUpdate({_id : req.user.id}, {
            
            location : req.body.location, phone :req.body.number , fname : req.body.name , Semester : req.body.sem 
            
              
      }, { new: true })
       }


        if (req.file) {
            newImageUrl = '/uploads/' + req.file.filename; // Store new image path
            UpadteProfile = await User.findOneAndUpdate({_id : req.user.id}, {
            
                location : req.body.location, phone :req.body.number , fname : req.body.name ,  Semester : req.body.sem ,
                imageurl: newImageUrl, 
                  
          }, { new: true })
        }


    

        if(!UpadteProfile){
            console.log("profile not updated")
        }else{
            console.log(UpadteProfile)
            res.redirect('/profile')
        }

        
        




      }else{
          res.redirect('/')
      }
}






exports.getchangepasscontrol =async(req,res)=>{
    if(req.isAuthenticated()){
        const googleUSer =await User.findById({_id :req.user.id})
        
        if(!googleUSer.googleId || googleUSer.googleId == null ){
            res.render('changepass')
        }else{
            res.render("googleusererror",{errormsg : "You are logged in using google"})
        }
        
    }else{

    }

 
}
exports.changepasscontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        if(req.body.newpassword == req.body.confirmpassword){

      
        const UpdatePassword = await User.findById({_id :req.user.id})
        console.log(UpdatePassword)
        if(!UpdatePassword){
            console.log('cannot get the user to update passsword')
        }else{
            UpdatePassword.changePassword(req.body.oldpassword, req.body.newpassword, function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log('password updated')
                    res.redirect('/profile')
                }
            })
        }
    }else{
        res.render('changepass',{errormsg : "password not mached"})
    }
    }else{
        res.redirect('/')
    }
}

 


