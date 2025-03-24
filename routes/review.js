const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview , isLoggedIn , isreviewAuthor} = require("../loggedInMiddelware.js");
const reviewController = require("../controller/reviews.js")



// Reviews
// Post Route
router.post("/" ,isLoggedIn, validateReview, wrapAsync(reviewController.postReview))

// Reviews
// Delete Route
 
router.delete("/:reviewId" , isLoggedIn,isreviewAuthor,wrapAsync(reviewController.deleteReview))


module.exports = router;
