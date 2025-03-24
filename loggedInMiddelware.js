const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js")

module.exports.isLoggedIn = (req ,res ,next) => {
    if(!req.isAuthenticated()){ // this method is used for checking that is user is logged in or not for create a new listing
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You Must Be Logged In for Create Listing");
        return res.redirect("/login");
    }
    next();
}

// because of passport inbuilt functionality of authenticate() is delete the redirectUrl value and set to undefined for getting
// access of that redirectUrl make an middelware function which store our redirectUrl to our locals 

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req , res , next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" , "You Are Not The Owner Of This Listing ");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

// middleware for review deletion for only particular author should delete review
module.exports.isreviewAuthor = async(req , res , next) =>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error" , "You Are Not The Author Of This Review ");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

// Error Handling Function for Checking Correct Listing
module.exports.validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }
}


// Error Handling Function for Checking Correct Review
module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }
}


