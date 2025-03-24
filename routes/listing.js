const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const {isLoggedIn, isOwner , validateListing} = require("../loggedInMiddelware.js");
const listingController = require("../controller/listings.js")


// Index Route
router.get("/" , wrapAsync(listingController.index));

// New Route
router.get("/new" , isLoggedIn , listingController.renderNewForm);

// Show Route
router.get("/:id" , wrapAsync(listingController.showListing))

// Create route
router.post("/" , 
    isLoggedIn, 
    validateListing, 
    wrapAsync(listingController.createListing)
);

// Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.editPage));

// Update Route
router.put("/:id" , isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updatePage))

// Delete Route
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;