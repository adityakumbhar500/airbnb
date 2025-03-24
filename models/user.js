// const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    // here we dont declare username and password because our passport-local-mongoose will add an username & password autimatically
    // also add an hash and salt field to store username
    email: {
        type: String ,
        required:true
    },  
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User' , userSchema);