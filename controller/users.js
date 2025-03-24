const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) =>{
    res.render("users/signup.ejs");
}

module.exports.signupUserpost = async(req,res) =>{
    try{
        let {username , email , password} =  req.body;
        const newUser = new User({email , username})
        const registeruser = await User.register(newUser , password);
        console.log(registeruser);
        req.login(registeruser , (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success" , "Welcome to AirBnb !");
            res.redirect("/listings");
        })
    }catch(e) {
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLoginForm = (req , res) =>{
    res.render("users/login.ejs")
}

module.exports.loginUser = async(req,res) => {
    req.flash("success" , "Welcome Back to AirBnb!");  
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);  
}

module.exports.logout = (req,res) => {
    req.logOut((err) => { // inBuilt function of passport for doing logout functionality
       req.flash("success" , "You are Logged Out Succesfully !"),
       res.redirect("/listings")
       }
    )
}