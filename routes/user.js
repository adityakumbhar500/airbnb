const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../loggedInMiddelware.js");
const userController = require("../controller/users.js")


// for signup
router.get("/signup" , userController.renderSignupForm)

router.post("/signup", wrapAsync(userController.signupUserpost));


// for Login

router.get("/login", userController.renderLoginForm);

router.post("/login" ,saveRedirectUrl, passport.authenticate("local" , {failureRedirect: '/login' , failureFlash: true}), userController.loginUser)

// For Logout

router.get("/logout" , userController.logout)


module.exports = router;