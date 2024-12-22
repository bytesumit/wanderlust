const User = require('../models/User');
const flash = require('connect-flash');

module.exports.signUpForm =  async (req,res)=>{
    res.render('./users/signUp.ejs');
};

module.exports.signUp = async(req,res)=>{
    try{
        let{username ,email , password } = req.body;
        const newUser = new User({email,username});
        const registerUser = await User.register(newUser,password); 
        req.login(registerUser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success", "Welcome to Wanderlust");
         res.redirect('/listing');
        })
          
    }catch(e){
        req.flash("error",e.message);
        res.redirect('/signUp');
    }
};

module.exports.loginForm = async(req,res)=>{
    res.render('./users/login.ejs');
};

module.exports.login =  async (req,res)=>{
    // console.log(req.user);
        req.flash("success", "Login Successfully ");
        if(!res.locals.currUrl){
            // console.log(res.locals.currUrl)
            return res.redirect('/listing');
        }
        // console.log(res.locals.currUrl)
        
        
        res.redirect(res.locals.currUrl); 
};

module.exports.logout =  async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success","You logout Successfully")
        res.redirect('/listing')
    });
    
}