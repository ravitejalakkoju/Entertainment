const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const User = require("./models/user");
const Thread = require("./models/thread");
const seedDB = require("./seeds.js");
const movieSearch = require("./public/Scripts/searchMovie.js");
const gameSearch = require("./public/Scripts/gameSearch.js");
const anime_mangaSearch = require("./public/Scripts/anime_mangaSearch.js");
const characterSearch = require("./public/Scripts/characterSearch.js");
const comicSearch = require("./public/Scripts/comicSearch.js");


const app = express();



mongoose.connect("mongodb://localhost/Entertainment", {useNewUrlParser: true}); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

app.use(require("express-session")({
    secret: "This is the best website ever",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.getParams = (url) => {
        
    };
    next();
});
/* <h1 style="color: white;"><%= getParams("221069.png").width %> <%= getParams("221069.png").height %></h1> */


User.find({}, (err, allUsers) => {
    if(err) { 
        console.log(err);
    } else {
        console.log(allUsers);
    }
});

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/dashboard");
};

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/dashboard", (req, res) => {
    let list = [];
    res.render("dashboard/index", {list: list});
});

app.put("/dashboard",isLoggedIn, (req,res) => {
    User.findById(req.user._id).then( async (foundUser) => {
        var like = {
            image: req.body.like.image_url,
            name: req.body.like.name,
            url: req.body.like.url,
            id: req.body.like.id
        };
        foundUser.likes.push(like);
        await foundUser.save();
        req.flash("success", 'Added to the list');
        res.redirect("dashboard");
        }).catch((err) => {
            req.flash("error", err.message);
            res.redirect("/dashboard");
        });

});



app.post("/dashboard", (req, res) => {
    let jsonf;
    let name = req.body.searchof.name,
    type = req.body.searchof.type ,
    year = req.body.searchof.year;
    let find;
    
    if(type === 'movie' || type === 'series') {
        find = async () => {
            const test = new movieSearch(name);
            jsonf = await test.getMovieDetails(type);
            res.render("dashboard/index", {list: jsonf, year: year, type: type});
        }
    } else if(type === 'comics') {
        find = async () => {
            const test = new comicSearch();
            jsonf = await test.getComicDetails(name);
            res.render("dashboard/index", {list: jsonf, year: year, type: type});
        }
    } else if(type === 'games') {
        find = async () => {
            const test = new gameSearch();
            jsonf = await test.getGameDetails(name);
            res.render("dashboard/index", {list: jsonf, year: year, type: type});
        }
     } else if(type === 'manga') {
            find = async () => {
                const test = new anime_mangaSearch();
                jsonf = await test.getmangaDetails(name);
                res.render("dashboard/index", {list: jsonf.results, year: year, type: type});
            }
        } 
        else if(type === 'anime') {
            find = async () => {
                const test = new anime_mangaSearch();
                jsonf = await test.getanimeDetails(name);
                res.render("dashboard/index", {list: jsonf.results, year: year, type: type});
            }
        } else if(type === 'superhero') {
            find = async () => {
                const test = new characterSearch();
                jsonf = await test.getComicCharacterDetails(name);
                res.render("dashboard/index", {list: jsonf, year: year, type: type});
            }
        } else if(type === 'mangaChar') {
            find = async () => {
                const test = new characterSearch();
                jsonf = await test.getMangaCharacterDetails(name);
                res.render("dashboard/index", {list: jsonf.results, year: year, type: type});
            }
        }
    find();
});

app.post("/login",passport.authenticate("local",
    {successRedirect: "/dashboard",
    failureRedirect: "/dashboard"
    }), (req, res) => { 
});


app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", (req, res) => {
    const newUser = new User({username: req.body.username, quote: req.body.quote, displayPicture: req.body.displayPicture   });
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", err.message);
            res.redirect("/signup");
        } 
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to Entertainment " + user.username);
            res.redirect("/dashboard");
        });
    });
});

app.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Succesfully Logged you out");
    res.redirect("/dashboard");
});

app.get("/profile/:userid", isLoggedIn, (req, res) => {
    res.render("profile");
});

app.put("/profile/:userid", isLoggedIn, (req, res) => {
    User.findById(req.params.userid).then( async (foundUser) => {
        foundUser.quote = req.body.userd.quote;
        if(req.body.userd.displayPicture !== ''){
        foundUser.displayPicture = req.body.userd.displayPicture;
        }
        const updatedUser = await foundUser.save();
        req.flash('success', 'Updated Details Successfully');
        res.redirect("/profile/:userid");
        }).catch((err) => {
            req.flash("error", err.message);
            res.redirect("/profile/:userid");
        });
});

app.put("/profile/:userid/deleteLike",isLoggedIn, (req,res) => {
    User.findById(req.user._id).then( async (foundUser) => {
        var like = {
            id: req.body.like.id
        };
        
        foundUser.likes.remove(foundUser.likes.find( el => el.id === req.body.like.id));
        await foundUser.save();
        req.flash("success", 'Removed from the list');
        res.redirect("/profile/:userid");
        }).catch((err) => {
            req.flash("error", err.message);
            res.redirect("/dashboard");
        });

});

app.get("/profile/:userid/changePassword", isLoggedIn,(req, res) => {
    res.render("changePassword");
});
// Change Password
app.put("/profile/:userid/changePassword", isLoggedIn,(req,res) =>{
    const newpass = req.body.password.password;
    const newpassconfirm = req.body.password.repassword;


    if (newpass !== newpassconfirm) {
        req.flash("error", "New password and ReEntered passwords do not match");
    }

    User.findById(req.params.userid).then( async (foundUser) => {
        await foundUser.setPassword(req.body.password.password);
        const updatedUser = await foundUser.save();
        req.login(updatedUser, () => {
            req.flash('success', 'Password Changed Successfully');
            res.redirect("/profile/:userid");
        });
        
        }).catch((err) => {
            req.flash("error", err.message);
            res.redirect("/profile/:userid");
        });
});


app.get("/dashboard/posts", (req, res) => {
    Thread.find({}, (err, allPosts) => {
        if(err) {
            console.log(err);
        } else {
            User.find({}, (err, allUsers) => {
                if(err) { 
                    console.log(err);
                } else {
                    res.render("posts/threads", {posts: allPosts, users: allUsers});
                }
            });
        }
    });
});

app.post("/dashboard/posts", isLoggedIn, (req, res) => {
    var thread = req.body.post.thread;
    var postOn = {url: req.body.post.url,
    name: req.body.post.name,id: '',
type: req.body.post.typeOf};
    var author = {
        id: req.user._id,
        username: req.user.username,
        displayPicture: req.user.displayPicture
    };

    
    var newThread = { postOn: postOn,thread: thread, author: author};
    Thread.create(newThread, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/dashboard/posts");
        }
    });    
});

app.post("/dashboard/posts/find", isLoggedIn, (req, res) => {
    res.send("working");
});

app.get("/dashboard/posts/createPost", isLoggedIn,  (req, res) => {
    res.render("posts/createPost",{postDetails: {}});
});

app.post("/dashboard/posts/createPost", isLoggedIn,  (req, res) => {
    res.render("posts/createPost",{postDetails: req.body.post});
});

app.listen(process.env.PORT || 1000, process.env.IP, () => {
    console.log("Server Started Succesfully");
});
