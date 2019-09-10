const mongoose = require("mongoose");
const User = require("../models/user");
// const Comment = require("/comment");


var threadSchema = new mongoose.Schema({
    postOn: {
        url: String,
        name: String,
        id: String,
        typeOf: String
    },
    thread: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        displayPicture: String,
        quote: String
    },

    // ,
    // comments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Comment"
    //     }
    // ]
});

module.exports = mongoose.model("Thread", threadSchema);

