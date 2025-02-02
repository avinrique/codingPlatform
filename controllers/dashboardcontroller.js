const User = require('./../models/usermodel')   
exports.getcontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        const Userprofile = await User.findById({_id : req.user.id})
        res.render('dashboard' ,{  pic : Userprofile.imageurl , logged_in :"true"})
       
    }
    else{
        res.redirect('/')
    }
    
}