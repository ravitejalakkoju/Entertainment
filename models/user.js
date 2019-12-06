const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    quote: String,
    displayPicture: String,
    likes: [{image: String, name: String, url: String, id: String}]
});

UserSchema.methods.findLike = (id) => {
    likes.forEach((el) => {
        if(el.id === id){
            return true;
        } else {
            return false;
        }
    });
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);