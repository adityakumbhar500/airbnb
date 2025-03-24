const Listing = require("../models/listing.js");

module.exports.index = async(req , res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
}

module.exports.renderNewForm = async (req , res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req , res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate:{path: "author"}}).populate("owner");
    res.render("listings/show.ejs" , {listing});
}

module.exports.createListing = async (req, res , next) => {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id; // storing currrent user information which include owner also
        await newListing.save();
        req.flash("success" , "New Listing Created")
        res.redirect("/listings");
}

module.exports.editPage = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}

module.exports.updatePage = async (req , res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success" , "Listing Updated")
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted")
    res.redirect("/listings");
}

