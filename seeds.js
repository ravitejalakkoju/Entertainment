
var mongoose = require("mongoose");
var User = require("./models/user");
var Thread = require("./models/thread");

function seedDB(){
   //Remove all campgrounds
   User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Users!");
    }); 
    Thread.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Posts!");
    }); 
    //add a few comments
}
 
module.exports = seedDB;