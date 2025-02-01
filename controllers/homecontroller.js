exports.getcontrol = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('home', {logged_in :"false"
    })
    }
    else{
        res.render('home' ,{logged_in :"true"
        })
    }
    
}


