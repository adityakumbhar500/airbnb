const mongoose = require("mongoose");
const { type } = require("os");
const wrapAsyc = require("../utils/wrapAsyc");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1740175919285-451699588f1b?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1740175919285-451699588f1b?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type:  Schema.Types.ObjectId,
    ref: "User",
  }
});


// this middlware fun is for if we delete any lisitng then we are going to delete all related reviews for that listing
listingSchema.post("findOneAndDelete" , wrapAsyc(async (listing) => {
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
  
}))

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;